"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();

  useEffect(() => console.error(error), [error]);

  return (
    <main
      className="
      flex
      min-h-[50vh]
      flex-col
      items-center
      justify-center
      "
    >
      <h2
        className="
        text-center
        text-2xl
        font-medium
        mb-2
        "
      >
        Something went wrong!
      </h2>
      <Button onClick={() => router.refresh()}>Try again</Button>
    </main>
  );
}
