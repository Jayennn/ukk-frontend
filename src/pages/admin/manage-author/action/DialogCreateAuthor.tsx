import {FullDialog} from "@/components/FullDialog";
import {DialogProps} from "@radix-ui/react-dialog";
import {Controller, useForm} from "react-hook-form";
import {Author, AuthorForm, authorFormSchema} from "@/server/api/routers/author/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {FullInput} from "@/components/FullInput";
import {Button} from "@/components/ui/button";
import Dropzone from "react-dropzone";
import {Label} from "@/components/ui/label";
import React, {useState} from "react";
import Image from "next/image";
import {FullTextArea} from "@/components/FullTextArea";
import {useMutation} from "@tanstack/react-query";
import {LoginForm} from "@/server/api/routers/login/schema";
import {Axios} from "@/utils/axios";
import {useSession} from "next-auth/react";
import {toast} from "sonner";
import {trpc} from "@/utils/trpc";
import {AxiosError} from "axios";


export const DialogCreateAuthor = ({onOpenChange, ...props}: DialogProps) => {
  const {data: session} = useSession();
  const [file, setFile] = useState<string | null>(null);
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: {errors}
  } = useForm<AuthorForm>({
    resolver: zodResolver(authorFormSchema),
    defaultValues: {
      author_name: "",
      author_image: "",
      address: "",
      phone_number: ""
    }
  })

  const ctx = trpc.useUtils();
  const addAuthorMutation = useMutation({
    mutationFn: async(data: AuthorForm) => {
      const res = await Axios.post('/authors', data, {
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
    await addAuthorMutation.mutateAsync(data)
  }

  const handleImageChange = (data: File) => {
    setFile(URL.createObjectURL(data))
  }

  return (
    <>
      <FullDialog
        formName="form-author"
        onOpenChange={() => {
          onOpenChange!(false)
          reset()
          setFile(null)
        }}
        close={() => onOpenChange!(false)}
        {...props}
        title="Add Author"
        description="Add Author Form. Click save when you're done"
      >
        <form id="form-author" onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <FullInput
            {...register("author_name")}
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
              control={control}
              name="author_image"
            />
            {/*{errors.author_image?.message && <p className="text-sm font-medium text-red-500">{errors.author_image.message}</p>}*/}
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
