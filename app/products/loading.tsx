import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div
      className="
      max-w-7xl
      mx-auto
      px-4
      md:px-8
      "
    >
      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-10
        mt-4
        pb-10
        "
      >
        {[...Array.from({ length: 6 })].map((_, idx: number) => (
          <div
            key={idx}
            className="
            flex
            flex-col
            gap-2
            "
          >
            <Skeleton className="h-[230px]" />
            <div
              className="
              flex
              justify-between
              gap-2
              items-start
              "
            >
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-6 w-10" />
            </div>

            <div
              className="
              flex
              flex-col
              gap-2
              "
            >
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="h-8 w-full mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
