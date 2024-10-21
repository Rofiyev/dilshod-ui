"use client";

import { FC } from "react";
import { Product, User } from "@prisma/client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Calendar,
  DownloadIcon,
  EyeIcon,
  User2,
  DollarSignIcon,
} from "lucide-react";
import { format } from "date-fns";

interface PurchasedProductCardProps {
  item: Product;
  user: User;
}

const PurchasedProductCard: FC<PurchasedProductCardProps> = ({
  item,
  user,
}) => {
  return (
    <div
      className="
      rounded-lg
      border
      border-gray-100
      p-4
      "
    >
      <Carousel>
        <CarouselContent>
          {item.images.map((img: string, idx: number) => (
            <CarouselItem key={idx}>
              <div
                className="
                relative
                h-[230px]
                rounded-md
                overflow-hidden
                "
              >
                <Image
                  src={img}
                  alt="product image"
                  fill
                  className="object-cover size-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>

      <h1
        className="
          flex
          justify-between
          items-center
          mt-2
          font-semibold
          "
      >
        {item.name}
      </h1>

      <p
        className="
        text-gray-600
        line-clamp-3
        text-sm
        mt-2
        "
      >
        {item.smallDescription}
      </p>

      <div
        className="
        my-2
        border-t 
        border-b 
        p-2
        "
      >
        <div
          className="
          w-full
          flex
          items-center
          justify-between
          gap-2
          "
        >
          <div className="flex items-center gap-1">
            <User2 size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Author:</span>
          </div>
          <p className="text-neutral-900">
            {user.firstName} {user.lastName}
          </p>
        </div>
        <div
          className="
          w-full
          flex
          items-center
          justify-between
          gap-2
          "
        >
          <div className="flex items-center gap-1">
            <Calendar size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Created:</span>
          </div>
          <p className="text-neutral-900">
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "long",
            }).format(item.createdAt)}
          </p>
        </div>
        <div
          className="
          w-full
          flex
          items-center
          justify-between
          gap-2
          "
        >
          <div className="flex items-center gap-1">
            <DollarSignIcon size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Price:</span>
          </div>
          <p className="text-neutral-900">
            Free{" "}
            <sup>
              <del>{item.price}$</del>
            </sup>
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Button asChild variant="secondary" className="w-full mt-2">
          <Link href={`/product/${item.id}`}>
            <EyeIcon size={18} className="text-neutral-900" />
            View product
          </Link>
        </Button>
        <Button asChild className="w-full mt-2">
          <Link href={item.productFile} download>
            <DownloadIcon size={18} className="text-white" />
            Download
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PurchasedProductCard;
