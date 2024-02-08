import {createTRPCRouter, protectedProcedure} from "@/server/api/trpc";
import {authToken, Axios} from "@/utils/axios";
import {Book, bookFormSchema, IDBookSchema} from "@/server/api/routers/book/schema";
import {z} from "zod";
import {paginationSchema} from "@/utils/pagination";


export const bookRouter = createTRPCRouter({
  all: protectedProcedure
    .input(paginationSchema)
    .query(async({ctx, input: {page, limit}}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.get(`/books?page=${page}&limit=${limit}`, conf);

      return res.data as {
        message: string,
        data: Book[]
      }
    }),
  detail: protectedProcedure
    .input(IDBookSchema)
    .query(async({ctx, input}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.get(`/books/${input.id}`, conf);

      return res.data as {
        message: string,
        data: Book
      }
    }),
  create: protectedProcedure
    .input(bookFormSchema)
    .mutation(async({ctx, input}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.post(`/books`, input, conf);

      return res.data as {
        message: string,
        data: Book
      }
    }),
  edit: protectedProcedure
    .input(z.object({
      id: IDBookSchema,
      data: bookFormSchema
    }))
    .mutation(async({ctx, input}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.put(`/books/${input.id}`, input.data, conf);

      return res.data as {
        message: string,
        data: Book
      }
    }),
  delete: protectedProcedure
    .input(IDBookSchema)
    .mutation(async({ctx, input}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.delete(`/books/${input.id}`, conf);

      return res.data as {
        message: string,
        data: Book
      }
    })
})
