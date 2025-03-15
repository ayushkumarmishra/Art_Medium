"use client";

import { trpc } from "@/trpc/client";

const PageClient = () => {
  const [data] = trpc.hello.useSuspenseQuery({
    text: "Ayush",
  });
  return <div>The age says : {data.greeting}</div>;
};

export default PageClient;
