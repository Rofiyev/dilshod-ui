"use client";

import { FrownIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EmptyState = () => {
  return (
    <div
      className="
      h-[calc(100vh_-_25vh)]
      flex
      justify-center
      items-center
      "
    >
      <div
        className="
        flex
        flex-col
        justify-center
        items-center
        "
      >
        <FrownIcon size={64} className="text-sky-600 mb-2" />
        <h1
          className="
          font-semibold
          text-4xl
          mb-2
          "
        >
          Not Found product
        </h1>
        <Link href="/">
          <Button variant="outline" className="group">
            Back to Home
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;
