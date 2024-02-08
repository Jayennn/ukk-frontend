import {z} from "zod";
import {categorySchema} from "@/server/api/routers/category/schema";
import {authorBookSchema} from "@/server/api/routers/author_books/schema";

export const IDBookSchema = z.object({
  id: z.number()
})

export const bookSchema = z.object({
  id: z.number(),
  book_title: z.string(),
  book_cover: z.string(),
  category_id: z.number(),
  release_date: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  author_books: z.array(authorBookSchema),
  category: categorySchema
})

export const bookFormSchema = z.object({
  book_title: z.string().min(1, "Book Title is required"),
  book_cover: z.any(),
  release_date: z.string().min(1, "Release Date is required"),
  category_id: z.number({
    required_error: "Category is required"
  }),
  author_id: z.array(z.number())
})

export type BookForm = z.infer<typeof bookFormSchema>;
export type Book = z.infer<typeof bookSchema>
