import ProductCard from "@/components/shared/product-card";
import Unauthorized from "@/components/shared/unauthorized";
import prisma from "@/lib/prismadb";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Product } from "@prisma/client";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  const data = await prisma.product.findMany({
    where: {
      userId,
    },
  });

  return data;
}

async function checkStripeLinked(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeConnectedLinked: true,
    },
  });

  if (!data?.stripeConnectedLinked) return redirect("/billing");
}

export default async function MyProducts() {
  noStore();
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  if (!currentUser) return <Unauthorized />;

  await checkStripeLinked(currentUser.id);

  const data = await getData(currentUser.id);

  return (
    <div
      className="
      max-w-7xl
      mx-auto
      px-4
      md:px-8
      pb-10
      "
    >
      <h1 className="text-2xl font-bold">My Products</h1>
      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-1
        lg:grid-cols-3
        gap-10
        mt-4
        "
      >
        {data.map((item: Product) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
