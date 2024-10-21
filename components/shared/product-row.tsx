import prisma from "@/lib/prismadb";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "./product-card";

interface IAppProps {
  category: "newest" | "templates" | "uikits" | "icons";
}

async function getData({ category }: IAppProps) {
  switch (category) {
    case "icons": {
      const data = await prisma.product.findMany({
        where: { category: "icon" },
      });

      return {
        products: data,
        title: "Icons",
        link: "/products/icons",
      };
    }
    case "newest": {
      const data = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
      });

      return {
        products: data,
        title: "Newest Products",
        link: "/products/all",
      };
    }
    case "templates": {
      const data = await prisma.product.findMany({
        where: { category: "template" },
      });

      return {
        products: data,
        title: "Templates",
        link: "/products/template",
      };
    }
    case "uikits": {
      const data = await prisma.product.findMany({
        where: { category: "uikit" },
      });

      return {
        products: data,
        title: "UI Kits",
        link: "/products/uikit",
      };
    }
    default:
      return notFound();
  }
}

export default async function ProductRow({ category }: IAppProps) {
  const data = await getData({ category });

  return (
    <>
      {data.products.length ? (
        <section className="mt-12">
          <div
            className="
            md:flex
            md:items-center
            md:justify-between
            "
          >
            <h2
              className="
              text-2xl
              font-semibold
              tracking-tighter
              "
            >
              {data.title}
            </h2>
            <Link
              href={data.link}
              className="
              text-sm
              hidden
              font-medium
              text-primary
              hover:text-primary/90
              md:flex
              md:items-center
              md:gap-1
              "
            >
              All Products <ArrowRight size={15} />
            </Link>
          </div>

          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            mt-4
            gap-10
            "
          >
            {data.products.slice(0, 3).map((item: Product) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
