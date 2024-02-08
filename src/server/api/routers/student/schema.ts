import {z} from "zod";


export const studentSchema = z.object({
  id: z.number(),
  name: z.string(),
  phone_number: z.string(),
  address: z.string(),
  gender: z.string(),
  username: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
