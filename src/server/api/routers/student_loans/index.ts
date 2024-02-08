import {createTRPCRouter, protectedProcedure} from "@/server/api/trpc";
import {addBookLoan, Loan, studentIdSchema} from "@/server/api/routers/student_loans/schema";
import {authToken, Axios} from "@/utils/axios";
import {z} from "zod";


export const studentLoanRouter = createTRPCRouter({
  all: protectedProcedure
    .input(studentIdSchema)
    .query(async({ctx, input: {studentId}}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.get(`/students/${studentId}/loans`, conf);

      return res.data as {
        message: string,
        data: Loan
      }
    }),
  create: protectedProcedure
    .input(z.object({
      id: z.number(),
      data: addBookLoan
    }))
    .mutation(async({ctx, input: {id, data}}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.post(`/students/${id}/loans`, data, conf);

      return res.data as {
        message: string,
        data: Loan
      }
    })
})
