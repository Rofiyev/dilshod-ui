import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div
      className="
      w-full
      min-h-[80vh]
      flex
      items-center
      justify-center
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
            <XCircle
              className="
              size-12
              rounded-full
              bg-red-500/30
              text-red-500
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
              Payment Canceled
            </h3>
            <p
              className="
              mt-2
              text-sm
              text-muted-foreground
              "
            >
              Someting went wrong with your payment. You have not been charged.
              Please try again.
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
  );
}
