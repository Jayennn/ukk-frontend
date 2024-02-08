import {z} from "zod";

export const categorySchema = z.object({
  id: z.number(),
  category_name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export const categoryFormSchema = z.object({
  category_name: z.string().min(1, "Category Name is required")
})

export type Category = z.infer<typeof categorySchema>;
export type CategoryForm = z.infer<typeof categoryFormSchema>;
