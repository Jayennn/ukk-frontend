import {FullDialog} from "@/components/FullDialog";
import {useForm} from "react-hook-form";
import {StaffForm, staffFormSchema} from "@/server/api/routers/staff/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Label} from "@/components/ui/label";
import {FullInput} from "@/components/FullInput";
import {Textarea} from "@/components/ui/textarea";
import {DialogProps} from "@radix-ui/react-dialog";
import {Button} from "@/components/ui/button";
import {trpc} from "@/utils/trpc";
import {toast} from "sonner";
import {FullTextArea} from "@/components/FullTextArea";


export const DialogCreateStaff = ({onOpenChange, ...props}: DialogProps) => {

  const {
    reset,
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<StaffForm>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      name: "",
      phone_number: "",
      address: ""
    }
  })

  const ctx = trpc.useUtils();
  const addStaffMutation = trpc.staff.create.useMutation({
    onSuccess: async({message}) => {
      toast.success(message)
      onOpenChange!(false)
      reset()
      await ctx.staff.all.invalidate();
    },
    onError: ({data, message}) => {
      toast.error(data?.errZod ?? message)
    }
  })

  const onSubmit = async(data: StaffForm) => {
    await addStaffMutation.mutateAsync(data)
  }

  return (
    <>
      <FullDialog
        formName="form-staff"
        onOpenChange={() => {
          onOpenChange!(false)
          reset()
        }}
        close={() => onOpenChange!(false)}
        {...props}
        title="Add Staff"
        description="Add Staff Form. Click save when you're done"
      >
        <form id="form-staff" onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <FullInput
            {...register("name")}
            errMsg={errors.name?.message}
            id="staff-name"
            placeholder="jhon@doe"
            label="Staff Name"
          />
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
            label="Address"
          />
        </form>
      </FullDialog>
    </>
  )
}
