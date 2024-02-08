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


export const CreateDialogCategory = ({ onOpenChange, ...props}: DialogProps) => {
  const ctx = trpc.useUtils();
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
        onOpenChange={() => {
          onOpenChange!(false)
          reset()
        }}
        {...props}
        title="Add Category"
        description="Add Category Form. Click save when you're done"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="category-name">Category Name</Label>
            <Input
              id="category-name"
              {...register("category_name")}
              placeholder="anime"
            />
            {errors.category_name?.message && <p className="text-xs font-medium text-red-500">{errors.category_name.message}</p>}
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button onClick={() => onOpenChange!(false)} size="sm" variant="ghost">Close</Button>
            <Button type="submit" size="sm">Create</Button>
          </div>
        </form>
      </FullDialog>
    </>
  )
}
