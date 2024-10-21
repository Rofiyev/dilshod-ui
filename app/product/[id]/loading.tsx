import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <div
      className="
      max-w-7xl
      mx-auto
      px-4
      sm:px-8
      "
    >
      <div className="w-full">
        <div className="flex gap-8">
          <Skeleton className="h-[250px] lg:h-[400px] aspect-video" />
          <div
            className="
            w-full
            flex
            flex-col
            gap-5
            "
          >
            <Skeleton className="h-8 w-72" />
            <div className="flex flex-col gap-5">
              {[...Array.from({ length: 8 })].map((_, idx: number) => (
                <Skeleton key={idx} className="h-4 w-full" />
              ))}
            </div>
            <Skeleton className="h-8 w-full mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
