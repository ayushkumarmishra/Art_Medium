import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
export const appRouter = createTRPCRouter({
  hello: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      const dbUser = ctx.user;
      console.log(dbUser);

      return {
        greeting: `hello ${input.text}`,
      };
    }),
});
export type AppRouter = typeof appRouter;
