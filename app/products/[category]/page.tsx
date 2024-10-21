import EmptyState from "@/components/shared/empty-state";
import ProductCard from "@/components/shared/product-card";
import prisma from "@/lib/prismadb";
import { CATEGORY_TYPES, Product } from "@prisma/client";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(category: string) {
  let input: string;

  switch (category) {
    case "template":
      input = "template";
      break;
    case "uikit":
      input = "uikit";
      break;
    case "icon":
      input = "icon";
      break;
    case "all":
      return await prisma.product.findMany();

    default:
      return notFound();
  }

  const data = await prisma.product.findMany({
    where: {
      category: input as CATEGORY_TYPES,
    },
  });

  return data;
}

interface IParams {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: IParams) {
  noStore();
  const { category } = params;
  const data = await getData(category);

  if (!data.length) return <EmptyState />;

  return (
    <div
      className="
      max-w-7xl
      mx-auto
      px-4
      md:px-8
      "
    >
      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-10
        mt-4
        pb-10
        "
      >
        {data.map((product: Product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
}
