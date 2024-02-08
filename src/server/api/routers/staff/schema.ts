import {z} from "zod";

export const IDStaffSchema = z.object({
  id: z.number()
})

const staffSchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
  phone_number: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export const staffFormSchema = z.object({
  name: z.string().min(1, "Name field is required"),
  address: z.string().min(1, "Address field is required"),
  phone_number: z.string().min(1, "Phone Number is required").max(13, "Phone Number is too long")
})

export type StaffForm = z.infer<typeof staffFormSchema>;
export type Staff = z.infer<typeof staffSchema>;
