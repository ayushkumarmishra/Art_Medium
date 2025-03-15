import { HydrateClient, trpc } from "@/trpc/server";
import PageClient from "./client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

//Type-3

const HomePage = async () => {
  void (await trpc.hello.prefetch({
    text: "Ayush",
  }));

  return (
    <HydrateClient>
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorBoundary fallback={<p>Error...</p>}>
          <PageClient />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
};

export default HomePage;
