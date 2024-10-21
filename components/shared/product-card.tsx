"use client";

import { FC } from "react";
import { Product } from "@prisma/client";
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

interface ProductCardProps {
  item: Product;
}

const ProductCard: FC<ProductCardProps> = ({ item }) => {
  return (
    <div className="rounded-lg">
      <Carousel>
        <CarouselContent>
          {item.images.map((img: string, idx: number) => (
            <CarouselItem key={idx}>
              <div
                className="
                relative
                h-[230px]
                border
                border-gray-50/80
                rounded-sm
                "
              >
                <Image
                  src={img}
                  alt="product image"
                  fill
                  className="
                  object-cover
                  w-full
                  h-full
                  rounded-lg
                  "
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {Array.isArray(item?.images) && item?.images.length > 1 && (
          <>
            <CarouselPrevious className="ml-16" />
            <CarouselNext className="mr-16" />
          </>
        )}
      </Carousel>
      <div
        className="
        flex
        justify-between
        items-center
        mt-2
        "
      >
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
        <h3
          className="
          inline-flex
          items-center
          rounded-md
          bg-primary/10
          px-2
          py-1
          text-sm
          font-medium
          text-primary
          ring-1
          ring-inset
          ring-primary/10
          "
        >
          ${item.price}
        </h3>
      </div>

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

      <Button asChild className="w-full mt-2">
        <Link href={`/product/${item.id}`}>Learn More</Link>
      </Button>
    </div>
  );
};

export default ProductCard;
