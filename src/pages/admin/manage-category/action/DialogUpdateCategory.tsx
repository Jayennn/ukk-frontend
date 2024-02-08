import {DialogProps} from "@radix-ui/react-dialog";
import {FullDialog} from "@/components/FullDialog";
import {useForm} from "react-hook-form";
import {Category, CategoryForm, categoryFormSchema} from "@/server/api/routers/category/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {FullInput} from "@/components/FullInput";
import {Axios} from "@/utils/axios";
import {useSession} from "next-auth/react";
import {trpc} from "@/utils/trpc";
import {toast} from "sonner";


export const DialogUpdateCategory = (
  {id, onOpenChange, ...props}: DialogProps & {
    id: number
  }
) => {

  const {data: session} = useSession();

  const {
    reset,
    register,
    getValues,
    handleSubmit,
    formState: {errors}
  } = useForm<CategoryForm>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: async() => {
      const res = await Axios.get(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.user.token ?? ""}`
        }
      })

      const {data} = res.data as {
        message: string,
        data: Category
      }

      return data

    }
  })

  const ctx = trpc.useUtils();
  const updateCategoryMutation = trpc.category.update.useMutation({
    onSuccess: async({message}) => {
      toast.success(message)
      onOpenChange!(false)

      await ctx.category.all.invalidate();
      reset()
    },
    onError: ({data, message}) => {
      toast.error(data?.errZod ?? message)
    }
  })
  const onSubmit = async(data: CategoryForm) => {
    await updateCategoryMutation.mutateAsync({
      id,
      data
    })
  }

  return (
    <>
      <FullDialog
        formName="form-update-category"
        onOpenChange={() => {
          onOpenChange!(false)
          reset()
        }}
        close={() => onOpenChange!(false)}
        {...props}
        title="Update Category"
        description="Update Category Form. Click save when you're done"
      >
        <form id="form-update-category" onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <FullInput
            {...register("category_name")}
            isLoading={getValues("category_name") === undefined}
            errMsg={errors.category_name?.message}
            id="category-name"
            placeholder="Animek"
            label="Category Name"
          />
        </form>
      </FullDialog>
    </>
  )
}
