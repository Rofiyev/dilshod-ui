import prisma from "@/lib/prismadb";
import Link from "next/link";
import ProductCard from "@/components/shared/product-card";
import { Product } from "@prisma/client";

async function getData() {
  const data = await prisma.product.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

const NewestProducts = async () => {
  const datas = await getData();

  return (
    <div className="mt-12">
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
          font-extrabold
          tracking-tighter
          "
        >
          Newest Products
        </h2>
        <Link
          href="#"
          className="
          text-sm
          hidden
          font-medium
          text-primary
          hover:text-primary/90
          md:block
          "
        >
          All products <span>&rarr;</span>
        </Link>
      </div>

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        mt-4
        gap-10
        "
      >
        {datas.map((item: Product) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default NewestProducts;
