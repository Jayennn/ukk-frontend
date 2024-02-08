import {createTRPCRouter} from "@/server/api/trpc";
import {categoryRouter} from "@/server/api/routers/category";
import {staffRouter} from "@/server/api/routers/staff";
import {authorRouter} from "@/server/api/routers/author";
import {bookRouter} from "@/server/api/routers/book";
import {shelfRouter} from "@/server/api/routers/shelf";
import {studentLoanRouter} from "@/server/api/routers/student_loans";

export const appRouter = createTRPCRouter({
  category: categoryRouter,
  staff: staffRouter,
  author: authorRouter,
  book: bookRouter,
  shelf: shelfRouter,
  studentLoan: studentLoanRouter
})

export type AppRouter = typeof appRouter
