import StudioView from "@/Modules/studio/ui/views/studio-view";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

const Page = () => {
  void trpc.studio.getMany.prefetchInfinite({
    limit: 5,
  });
  return (
    <HydrateClient>
      <StudioView />
    </HydrateClient>
  );
};

export default Page;
