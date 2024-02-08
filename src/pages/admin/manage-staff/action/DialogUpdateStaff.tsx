import {FullDialog} from "@/components/FullDialog";
import {DialogProps} from "@radix-ui/react-dialog";
import {useForm} from "react-hook-form";
import {Staff, StaffForm, staffFormSchema} from "@/server/api/routers/staff/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Axios} from "@/utils/axios";
import {useSession} from "next-auth/react";
import {FullInput} from "@/components/FullInput";
import {FullTextArea} from "@/components/FullTextArea";
import {Button} from "@/components/ui/button";
import {trpc} from "@/utils/trpc";
import {toast} from "sonner";


export const DialogUpdateStaff = (
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
  } = useForm<StaffForm>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: async() => {
      const res = await Axios.get(`/staffs/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.user.token ?? ""}`
        }
      })

      const {data} = res.data as {
        message: string,
        data: Staff
      }

      return data
    }
  })

  const ctx = trpc.useUtils();
  const updateStaffMutation = trpc.staff.update.useMutation({
    onSuccess: async({message}) => {
      toast.success(message)
      onOpenChange!(false)

      await ctx.staff.all.invalidate();
      await ctx.staff.detail.refetch();
      reset()
    },
    onError: ({data, message}) => {
      toast.error(data?.errZod ?? message)
    }
  })

  const onSubmit = async(data: StaffForm) => {
    await updateStaffMutation.mutateAsync({
      id,
      data
    })
  }

  return (
    <>
      <FullDialog
        formName="form-update-staff"
        onOpenChange={() => {
          onOpenChange!(false)
          reset()
        }}
        close={() => onOpenChange!(false)}
        {...props}
        title="Update Staff"
        description="Update Staff Form. Click save when you're done"
      >
        <form id="form-update-staff" onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <FullInput
            {...register("name")}
            isLoading={getValues('name') === undefined}
            errMsg={errors.name?.message}
            id="staff-name"
            placeholder="jhon@doe"
            label="Staff Name"
          />
          <FullInput
            {...register("phone_number")}
            isLoading={getValues('phone_number') === undefined}
            errMsg={errors.phone_number?.message}
            id="phone-number"
            placeholder="08************"
            label="Phone Number"
          />
          <FullTextArea
            {...register("address")}
            isLoading={getValues('address') === undefined}
            errMsg={errors.address?.message}
            id="address"
            label="Address"
          />
        </form>
      </FullDialog>
    </>
  )
}
