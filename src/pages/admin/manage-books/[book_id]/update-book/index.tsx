import {NextPageWithLayout} from "@/pages/_app";
import {useRouter} from "next/router";
import {trpc} from "@/utils/trpc";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowLeft, Trash2} from "lucide-react";
import React, {ReactElement, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {Book, BookForm, bookFormSchema} from "@/server/api/routers/book/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Axios} from "@/utils/axios";
import {useSession} from "next-auth/react";
import {FullInput} from "@/components/FullInput";
import {FullAsyncPaginate} from "@/components/FullAsyncPaginate";
import {loadOptionsAuthor, loadOptionsCategory, OptionType} from "@/utils/select-options";
import AdminLayout from "@/layouts/admin/AdminLayout";
import {Label} from "@/components/ui/label";
import Dropzone from "react-dropzone";
import Image from "next/image";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";


const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const book_id = router.query.book_id;
  const {data: session} = useSession();
  const [file, setFile] = useState<string | null>(null);
  const [author, setAuthor] = useState<OptionType[]>([]);
  const [category, setCategory] = useState<OptionType>();
  const {
    control,
    register,
    getValues,
    handleSubmit,
    formState: {errors}
  } = useForm<BookForm>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: async() => {
      const res = await Axios.get(`/books/${book_id}`, {
        headers: {
          Authorization: `Bearer ${session?.user.token ?? ""}`,
        }
      })

      const {data} = (await res.data) as {
        message: string,
        data: Book
      }


      setAuthor(() => {
        return data.author_books.map((author) => ({
          value: `${author.author_id}`,
          label: author.author.author_name
        }))
      });

      setCategory({
        value: `${data.category_id}`,
        label: data.category.category_name
      })

      setFile(data.book_cover)

      return {
        book_title: data.book_title,
        book_cover: data.book_cover,
        release_date: data.release_date,
        author_id: data.author_books.map((author) => author.author_id),
        category_id: data.category_id,

      }
    }
  })

  const ctx = trpc.useUtils();
  const updateBookMutation = useMutation({
    mutationFn: async(data: BookForm) => {
      const res = await Axios.put(`/books/${book_id}`, data, {
        headers: {
          Authorization: `Bearer ${session?.user.token ?? ""}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        }
      })

      return res.data as {
        message: string,
        data: Book
      }
    },
    onSuccess: async({message}) => {
      toast.success(message)

      await router.push('/admin/manage-books')
      await ctx.book.all.invalidate();
      await ctx.book.detail.refetch();
    },
    onError: (e) => {
      if(e instanceof AxiosError){
        toast.error(e.message)
      } else {
        toast.error("Something Wrong")
      }
    }
  })

  const handleImageChange = (data: File) => {
    setFile(URL.createObjectURL(data))
  }

  const onSubmit = async(data: BookForm) => {
    await updateBookMutation.mutateAsync(data)
  }

  console.log(errors)

  return (
    <>
      <div className="bg-white space-y-4 rounded-md shadow-md border">
        <div className="p-4 border-b flex items-center justify-between">
          <Button onClick={() => router.back()} size="sm" className="flex items-center gap-2" asChild>
            <div>
              <ArrowLeft className="w-4 h-4" />
              Back
            </div>
          </Button>
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-row items-center gap-2">
              <div className="w-full flex flex-col gap-2">
                <FullInput
                  {...register("book_title")}
                  isLoading={getValues("book_title") === undefined}
                  errMsg={errors.book_title?.message}
                  id="book-title"
                  placeholder="Bahasa Indonesia"
                  label="Book Title"
                /><
                FullInput
                  {...register("release_date")}
                  isLoading={getValues("release_date") === undefined}
                  errMsg={errors.release_date?.message}
                  id="release-date"
                  placeholder="20**"
                  label="Release Date"
                />
                <Controller
                  render={({field}) => (
                    <FullAsyncPaginate
                      id="category"
                      additional={{
                        token: session?.user.token
                      }}
                      value={category}
                      errMsg={errors.category_id?.message}
                      loadOptions={loadOptionsCategory}
                      isLoading={getValues("category_id") === undefined}
                      onChange={(e) => {
                        field.onChange(Number(e?.value))
                        setCategory(e as OptionType)
                      }}
                      label="Category"
                    />
                  )}
                  name="category_id"
                  control={control}
                />
                <Controller
                  render={({field}) => (
                    <FullAsyncPaginate
                      isMulti
                      id="author"
                      additional={{
                        token: session?.user.token
                      }}
                      value={author}
                      errMsg={errors.author_id?.message}
                      loadOptions={loadOptionsAuthor}
                      isLoading={getValues("author_id") === undefined}
                      onChange={(value) => {
                        const author_id = value.map(data => Number(data.value));
                        field.onChange(author_id)
                        setAuthor(() => {
                          return value.map((e) => ({
                            value: `${e?.value}`,
                            label: e?.label
                          }))
                        })
                      }}
                      label="author"
                    />
                  )}
                  name="author_id"
                  control={control}
                />
              </div>
              <div className="flex flex-col gap-3 w-full max-w-[16rem]">
                <div className="flex flex-row items-center justify-between">
                  <Label htmlFor="book-image">Cover Book</Label>
                  {file ? (
                    <Trash2 className="w-4 h-4 text-red-500" onClick={() => setFile(null)}/>
                  ) : (
                    <p className="text-xs text-muted-foreground">No Cover Book</p>
                  )}
                </div>
                <Controller
                  render={({field}) => (
                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        const file = acceptedFiles[0] as File
                        field.onChange(acceptedFiles[0])
                        handleImageChange(file)
                      }}
                    >
                      {({getRootProps, getInputProps}) => (
                        <div
                          {...getRootProps()}
                          className="relative rounded-md h-[18rem] w-full max-w-[14rem] grid place-content-center cursor-pointer px-4 py-8 border border-dashed group-focus:border-primary-500 mx-auto"
                        >
                          {file ? (
                            <Image
                              fill
                              className="object-cover rounded-md"
                              src={file}
                              alt="book-pictrue"
                            />
                          ) : (
                            <div className="space-y-1 text-center">
                              <input id="book-image" type="file" {...getInputProps()}/>
                              <svg
                                className='mx-auto h-12 w-12 text-gray-400'
                                stroke='currentColor'
                                fill='none'
                                viewBox='0 0 48 48'
                                aria-hidden='true'
                              >
                                <path
                                  d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                                  strokeWidth={2}
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                />
                              </svg>
                              <p className="text-sm text-gray-500">
                                Drag and drop cover book here, or click to choose file
                              </p>
                            </div>
                          )}
                        </div>

                      )}
                    </Dropzone>
                  )}
                  key={file}
                  control={control}
                  name="book_cover"
                />
              </div>
            </div>
            <div>
              <Button type="submit" size="sm">Update Book</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default Page;
