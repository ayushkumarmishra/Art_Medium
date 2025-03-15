import { db } from "@/db";
import { users } from "@/db/schema";
import { ratelimit } from "@/lib/ratelimit";
import { auth } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { cache } from "react";
import superjson from "superjson";

export const createTRPCContext = cache(async () => {
  const { userId } = await auth();
  return { clerkUserid: userId };
});

//Creating the type for our context object
export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Initializing the TRPC context Object.
const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(
  async function isAuthenticated(opts) {
    const { ctx } = opts;

    if (!ctx.clerkUserid) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, ctx.clerkUserid))
      .limit(1);

    //rate limit check
    const { success } = await ratelimit.limit(user.id);
    if (!success) {
      throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
    }

    return opts.next({
      ctx: {
        ...ctx,
        user,
      },
    });
  }
);
