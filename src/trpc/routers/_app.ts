import { createTRPCRouter } from "../init";
import { studioRouter } from "@/Modules/studio/server/procedures";
import { categoriesRouter } from "@/Modules/categories/server/procedures";
import { videosRouter } from "@/Modules/videos/server/procedures";

export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  studio: studioRouter,
  videos: videosRouter,
});

export type AppRouter = typeof appRouter;
