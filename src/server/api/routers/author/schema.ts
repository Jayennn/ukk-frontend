import {z} from "zod";

export const IDAuthorSchema = z.object({
  id: z.number()
})

export const authorSchema = z.object({
  id: z.number(),
  author_name: z.string(),
  author_image: z.any(),
  phone_number: z.string(),
  author_books: z.array(z.any()),
  address: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const authorFormSchema = z.object({
  author_name: z.string().min(1, "Name field is required"),
  author_image: z.any(),
  phone_number: z.string().min(1, "Phone Number field is required"),
  address: z.string().min(1, "Address field is required"),
})

export type AuthorForm = z.infer<typeof authorFormSchema>;
export type Author = z.infer<typeof authorSchema>;
