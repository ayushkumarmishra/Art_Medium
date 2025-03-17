import { createTRPCRouter } from "../init";
import { studioRouter } from "@/Modules/studio/server/procedures";
import { categoriesRouter } from "@/Modules/categories/server/procedures";

export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  studio: studioRouter,
});

export type AppRouter = typeof appRouter;
