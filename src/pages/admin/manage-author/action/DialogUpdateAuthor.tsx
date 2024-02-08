import {DialogProps} from "@radix-ui/react-dialog";
import {useSession} from "next-auth/react";
import {Controller, useForm} from "react-hook-form";
import {Author, AuthorForm, authorFormSchema} from "@/server/api/routers/author/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Axios} from "@/utils/axios";
import {trpc} from "@/utils/trpc";
import {toast} from "sonner";
import {FullDialog} from "@/components/FullDialog";
import {FullInput} from "@/components/FullInput";
import {Label} from "@/components/ui/label";
import React, {useState} from "react";
import Image from "next/image";
import Dropzone from "react-dropzone";
import {FullTextArea} from "@/components/FullTextArea";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";


export const DialogUpdateAuthor = (
  {id, onOpenChange, ...props}: DialogProps & {
    id: number
  }
) => {
  const {data: session} = useSession();
  const [file, setFile] = useState<string | null>(null);
  const {
    reset,
    control,
    register,
    getValues,
    handleSubmit,
    formState: {errors}
  } = useForm<AuthorForm>({
    resolver: zodResolver(authorFormSchema),
    defaultValues: async() => {
      const res = await Axios.get(`/authors/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.user.token ?? ""}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        }
      })

      const {data} = res.data as {
        message: string,
        data: Author
      }

      return data
    }
  })

  const ctx = trpc.useUtils();
  const updateAuthorMutation = useMutation({
    mutationFn: async(data: AuthorForm) => {
      const res = await Axios.put(`/authors/${id}`, data, {
        headers: {
          Authorization: `Bearer ${session?.user.token ?? ""}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        }
      })

      return res.data as {
        message: string,
        data: Author
      }
    },
    onSuccess: async({message}) => {
      toast.success(message);

      onOpenChange!(false);
      reset();
      setFile(null);

      await ctx.author.all.invalidate();
      await ctx.author.detail.refetch();
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

  const onSubmit = async(data: AuthorForm) => {
    await updateAuthorMutation.mutateAsync(data)
  }

  const handleImageChange = (data: File) => {
    setFile(URL.createObjectURL(data))
  }

  return (
    <>
      <FullDialog
        onOpenChange={() => {
          onOpenChange!(false)
          reset()
        }}
        close={() => onOpenChange!(false)}
        {...props}
        formName="form-update-author"
        title="Update Author"
        description="Update Author Form. Click save when you're done"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="form-update-author"
          className="p-4 space-y-4"
        >
          <FullInput
            {...register("author_name")}
            isLoading={getValues("author_name") === undefined}
            errMsg={errors.author_name?.message}
            id="author-name"
            placeholder="jhon@doe"
            label="Author Name"
          />
          <div className="flex flex-col gap-3">
            <Label htmlFor="author-image">Profile Picture</Label>
            <Controller
              render={({field}) => (
                <Dropzone onDrop={(acceptedFiles) => {
                  const file = acceptedFiles[0] as File
                  field.onChange(acceptedFiles[0])
                  handleImageChange(file)
                }}>
                  {({getRootProps, getInputProps}) => (
                    <div
                      {...getRootProps()}
                      className="relative rounded-md h-[14rem] w-full grid place-content-center cursor-pointer px-4 py-8 border border-dashed group-focus:border-primary-500"
                    >
                      {file ? (
                        <Image
                          fill
                          className="object-contain "
                          src={file}
                          alt="profile-picture"
                        />
                      ) : (
                        <div className="space-y-1 text-center">
                          <input id="author-image" type="file" {...getInputProps()}/>
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
                            Drag and drop photo transaction here, or click to choose file
                          </p>
                        </div>
                      )}

                    </div>
                  )}
                </Dropzone>
              )}
              key={file}
              name="author_image"
              control={control}
            />
          </div>
          <FullInput
            {...register("phone_number")}
            errMsg={errors.phone_number?.message}
            id="phone-number"
            placeholder="08************"
            label="Phone Number"
          />
          <FullTextArea
            {...register("address")}
            errMsg={errors.address?.message}
            id="address"
            placeholder="address"
            label="Address"
          />
        </form>
      </FullDialog>
    </>
  )

}
