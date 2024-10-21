import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import prisma from "@/lib/prismadb";
import Image from "next/image";
import { JSONContent } from "@tiptap/react";
import dynamic from "next/dynamic";
import { buyProduct } from "@/actions";
import BuyButton from "@/components/shared/buy-button";
import { unstable_noStore as noStore } from "next/cache";

const ProductDescription = dynamic(
  () => import("@/components/shared/product-description"),
  { ssr: false }
);

interface PageProps {
  params: { id: string };
}

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: { id: productId },
    include: { user: true },
  });

  return data;
}

export default async function ProductId({ params }: PageProps) {
  noStore();
  const { id } = params;
  const data = await getData(id);

  return (
    <div
      className="
      max-w-7xl
      mx-auto
      px-4
      lg:px-8
      lg:grid
      lg:grid-cols-7
      lg:gap-x-8
      lg:gap-y-10
      "
    >
      <Carousel className="lg:row-end-1 lg:col-span-4">
        <CarouselContent>
          {data?.images.map((img: string, idx: number) => (
            <CarouselItem key={idx}>
              <div className="relative aspect-video rounded-sm">
                <Image
                  src={img}
                  alt="product image"
                  fill
                  className="
                  object-cover
                  size-full
                  rounded-sm
                  scale-105
                  "
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>

      <div
        className="
        max-w-2xl
        mx-auto
        mt-5
        lg:max-w-none
        lg:mt-0
        lg:row-end-2
        lg:row-span-2
        lg:col-span-3
        "
      >
        <h1
          className="
          text-2xl
          font-extrabold
          tracking-tight
          text-gray-900
          sm:text-3xl
          "
        >
          {data?.name}
        </h1>
        <p className="mt-2 text-muted-foreground text-sm">
          {data?.smallDescription}
        </p>
        <form action={buyProduct}>
          <input type="hidden" name="id" value={data?.id} />
          <BuyButton price={Number(data?.price)} />
        </form>

        <div
          className="
          border-t
          border-gray-200
          mt-5
          pt-2
          "
        />
        <div
          className="
          grid
          grid-cols-2
          w-full
          gap-y-3
          "
        >
          <h3
            className="
            text-sm
            font-medium
            text-muted-foreground
            col-span-1
            "
          >
            Released:
          </h3>
          <p className="text-sm font-medium col-span-1">
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "long",
            }).format(data?.createdAt)}
          </p>

          <h3
            className="
            text-sm
            font-medium
            text-muted-foreground
            col-span-1
            "
          >
            Category:
          </h3>
          <p
            className="
            text-sm
            font-medium
            col-span-1
            "
          >
            {data?.category}
          </p>
        </div>

        <div
          className="
          border-t
          border-gray-200
          mt-2
          w-full
          "
        />
      </div>

      <div
        className="
        w-full
        max-w-2xl
        mx-auto
        mt-16
        lg:max-w-none
        lg:mt-0
        lg:col-span-4
        "
      >
        <ProductDescription content={data?.description as JSONContent} />
      </div>
    </div>
  );
}
