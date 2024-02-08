import {z} from "zod";
import {bookSchema} from "@/server/api/routers/book/schema";
import {studentSchema} from "@/server/api/routers/student/schema";

export const studentIdSchema = z.object({
  studentId: z.number()
})

export const loanDetailsSchema = z.object({
  id: z.number(),
  loan_id: z.number(),
  book_id: z.number(),
  loan_detail_status: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  book: bookSchema
})

export const loanSchema = z.object({
  id: z.number(),
  student_id: z.number(),
  loan_status: z.string(),
  description: z.string(),
  loan_penalties: z.string(),
  loan_date: z.string(),
  due_date: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  loan_details: z.array(loanDetailsSchema),
  student: studentSchema
})

export const addBookLoan = z.object({
  book_id: z.number()
})

export type Loan = z.infer<typeof loanSchema>;
