import {createTRPCRouter, protectedProcedure} from "@/server/api/trpc";
import {authToken, Axios} from "@/utils/axios";
import {IDStaffSchema, Staff, staffFormSchema} from "@/server/api/routers/staff/schema";
import {z} from "zod";

export const staffRouter = createTRPCRouter({
  all: protectedProcedure
    .query(async({ctx}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.get('/staffs', conf);

      return res.data as {
        message: string,
        data: Staff[]
      }
    }),
  detail: protectedProcedure
    .input(IDStaffSchema)
    .query(async({ctx, input}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.get(`/staffs/${input.id}`, conf)

      return res.data as {
        message: string,
        data: Staff
      }
    }),
  create: protectedProcedure
    .input(staffFormSchema)
    .mutation(async({ctx, input}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.post(`/staffs`, input, conf)

      return res.data as {
        message: string,
        data: Staff
      }
    }),
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      data: staffFormSchema
    }))
    .mutation(async({ctx, input}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.put(`/staffs/${input.id}`, input.data, conf);

      return res.data as {
        message: string,
        data: Staff
      }
    }),
  delete: protectedProcedure
    .input(IDStaffSchema)
    .mutation(async({ctx, input}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.delete(`/staffs/${input.id}`, conf);

      return res.data as {
        message: string,
        data: Staff
      }
    })
})
