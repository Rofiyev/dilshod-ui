"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface BuyButtonProps {
  price: number;
}

const BuyButton: FC<BuyButtonProps> = ({ price }) => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="w-full mt-3">
          <Loader2 className="mr-2 h-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button type="submit" className="w-full mt-3">
          By for ${price}
        </Button>
      )}
    </>
  );
};

export default BuyButton;
