"use client";

import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { FilterCarousel } from "@/components/filter-carousel";

interface CategoriesSectionProps {
  categoryId?: string;
}

const CategorizationSection = ({ categoryId }: CategoriesSectionProps) => {
  const [categories] = trpc.categories.getMany.useSuspenseQuery();

  const data = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <Suspense
      fallback={<FilterCarousel isLoading data={[]} onSelect={() => {}} />}
    >
      <ErrorBoundary fallback={<p>Error...</p>}>
        <FilterCarousel
          onSelect={(x) => console.log(x)}
          value={categoryId}
          data={data}
        />
      </ErrorBoundary>
    </Suspense>
  );
};
export default CategorizationSection;
