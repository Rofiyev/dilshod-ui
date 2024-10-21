"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { useSearchParams } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

export default function SuccessPage() {
  noStore();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const [active, setActive] = useState<boolean>(false);
  const { height, width } = useWindowSize();

  useEffect(() => setActive(true), []);

  useEffect(() => {
    if (session_id) fetch(`/api/payment-status?session_id=${session_id}`);
  }, [session_id]);

  return (
    <>
      {active && <Confetti width={width} height={height} />}
      <div
        className="
        w-full
        min-h-[80vh]
        flex
        items-center
        justify-center
        overflow-x-hidden
        "
      >
        <Card className="w-[350px]">
          <div className="p-6">
            <div
              className="
              w-full
              flex
              justify-center
              "
            >
              <Check
                className="
                size-12
                rounded-full
                bg-green-500/30
                text-green-500
                p-2
                "
              />
            </div>
            <div
              className="
              mt-3
              text-center
              sm:mt-5
              w-full
              "
            >
              <h3
                className="
                text-lg
                leading-6
                font-medium
                "
              >
                Payment Successfully
              </h3>
              <p
                className="
                mt-2
                text-sm
                text-muted-foreground
                "
              >
                Congratulations to your purchase! Please check your email for
                futher instructions.
              </p>

              <Link href="/">
                <Button
                  variant="outline"
                  className="
                  group
                  mt-5
                  sm:mt-6
                  w-full
                  "
                >
                  Back to Home
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
