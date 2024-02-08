import {createTRPCRouter, protectedProcedure} from "@/server/api/trpc";
import {authToken, Axios} from "@/utils/axios";
import {Author, authorFormSchema, IDAuthorSchema} from "@/server/api/routers/author/schema";
import {z} from "zod";

export const authorRouter = createTRPCRouter({
  all: protectedProcedure
    .query(async({ctx}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.get('/authors', conf);

      return res.data as {
        message: string,
        data: Author[]
      }
    }),
  detail: protectedProcedure
    .input(IDAuthorSchema)
    .query(async({ctx, input}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.get(`/authors/${input.id}`, conf);

      return res.data as {
        message: string,
        data: Author
      }
    }),
  create: protectedProcedure
    .input(authorFormSchema)
    .mutation(async({ctx, input}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.post('/authors', input, conf);

      return res.data as {
        message: string,
        data: Author
      }
    }),
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      data: authorFormSchema
    }))
    .mutation(async({ctx, input}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.put(`/authors/${input.id}`, input.data, conf);

      return res.data as {
        message: string,
        data: Author
      }
    }),
  delete: protectedProcedure
    .input(IDAuthorSchema)
    .mutation(async({ctx, input}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.delete(`/authors/${input.id}`, conf);

      return res.data as {
        message: string,
        data: Author
      }
    })
})
