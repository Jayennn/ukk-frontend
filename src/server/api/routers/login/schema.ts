import {z} from "zod";


export const loginFormSchema = z.object({
  username: z.string().min(1, "Field Username is required"),
  password: z.string().min(1, "Field Password is required")
})

export const loginUserSchema = z.object({
  name: z.string(),
  username: z.string(),
  address: z.string(),
  phone_number: z.string(),
  role: z.string()
})

export type User = z.infer<typeof loginUserSchema>;
export type LoginForm = z.infer<typeof loginFormSchema>;
