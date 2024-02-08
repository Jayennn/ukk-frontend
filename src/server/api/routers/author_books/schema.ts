import {z} from "zod";
import {authorSchema} from "@/server/api/routers/author/schema";

export const authorBookSchema = z.object({
  id: z.number(),
  author_id: z.number(),
  book_id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  author: authorSchema
})
