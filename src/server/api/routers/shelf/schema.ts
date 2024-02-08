import {z} from "zod";

export const shelfSchema = z.object({
  id: z.number(),
  shelf_code: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type Shelf = z.infer<typeof shelfSchema>;
