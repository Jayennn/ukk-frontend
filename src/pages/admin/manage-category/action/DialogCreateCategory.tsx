import {DialogProps} from "@radix-ui/react-dialog";
import {useForm} from "react-hook-form";
import {FullDialog} from "@/components/FullDialog";
import {CategoryForm, categoryFormSchema} from "@/server/api/routers/category/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {trpc} from "@/utils/trpc";
import {toast} from "sonner";
import {FullInput} from "@/components/FullInput";


export const DialogCreateCategory = ({ onOpenChange, ...props}: DialogProps) => {

  const {
    reset,
    handleSubmit,
    register,
    formState: {errors}
  } = useForm<CategoryForm>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      category_name: ""
    }
  })

  const ctx = trpc.useUtils();
  const addCategoryMutation = trpc.category.create.useMutation({
    onSuccess: async({message}) => {
      toast.success(message)
      onOpenChange!(false)
      await ctx.category.all.invalidate()
    },
    onError: ({data, message}) => {
      toast.error(data?.errZod ?? message)
    }
  })

  const onSubmit = async(data: CategoryForm) => {
    await addCategoryMutation.mutateAsync(data)
  }



  return (
    <>
      <FullDialog
        formName="category-form"
        onOpenChange={() => {
          onOpenChange!(false)
          reset()
        }}
        {...props}
        title="Add Category"
        description="Add Category Form. Click save when you're done"
      >
        <form id="category-form" onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <FullInput
            id="category-name"
            {...register("category_name")}
            errMsg={errors.category_name?.message}
            placeholder="anime"
            label="Category Name"
          />
        </form>
      </FullDialog>
    </>
  )
}
