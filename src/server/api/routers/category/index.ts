import {createTRPCRouter, protectedProcedure} from "@/server/api/trpc";
import {authToken, Axios} from "@/utils/axios";
import {Category, categoryFormSchema} from "@/server/api/routers/category/schema";
import {z} from "zod";

export const categoryRouter = createTRPCRouter({
  all: protectedProcedure
    .query(async({ctx}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.get('/categories', conf);

      return res.data as {
        message: string,
        data: Category[]
      }
    }),
  create: protectedProcedure
    .input(categoryFormSchema)
    .mutation(async({ctx, input}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.post('/categories', input, conf)

      return res.data as {
        message: string,
        data: Category
      }
    }),
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      data: categoryFormSchema
    }))
    .mutation(async({ctx, input}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.put(`/categories/${input.id}`, input.data, conf);

      return res.data as {
        message: string,
        data: Category
      }
    })
})
