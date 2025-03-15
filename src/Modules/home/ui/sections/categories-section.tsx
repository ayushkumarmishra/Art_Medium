"use client";

import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

interface CategoriesSectionProps {
  categoryId?: string;
}

const CategorizationSection = ({ categoryId }: CategoriesSectionProps) => {
  const [categories] = trpc.categories.getMany.useSuspenseQuery();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <div>{JSON.stringify(categories)}</div>
      </ErrorBoundary>
    </Suspense>
  );
};
export default CategorizationSection;
