import {createTRPCRouter, protectedProcedure} from "@/server/api/trpc";
import {authToken, Axios} from "@/utils/axios";
import {Shelf} from "@/server/api/routers/shelf/schema";


export const shelfRouter = createTRPCRouter({
  all: protectedProcedure
    .query(async({ctx}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.get('/shelf', conf);

      return res.data as {
        message: string,
        data: Shelf[]
      }
    })
})
