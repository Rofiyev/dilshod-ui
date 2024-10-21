import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check } from "lucide-react";

export default function ReturnURLStripe() {
  return (
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
              Linking was Successfully
            </h3>
            <p
              className="
              mt-2
              text-sm
              text-muted-foreground
              "
            >
              Congratulations on linking your account to{" "}
              <a href="/" className="font-semibold text-neutral-700">
                Dilshod <span className="text-sky-600">UI</span>
              </a>{" "}
              . You can now start selling your products!
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
