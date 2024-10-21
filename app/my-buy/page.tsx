import EmptyState from "@/components/shared/empty-state";
import PurchasedProductCard from "@/components/shared/purchased-product-card";
import Unauthorized from "@/components/shared/unauthorized";
import prisma from "@/lib/prismadb";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  const data = await prisma.purchase.findMany({
    where: { userId },
    include: {
      product: true,
      user: true,
    },
  });

  return data;
}

export default async function MyBuyPage() {
  noStore();
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  if (!currentUser) return <Unauthorized />;

  const data = await getData(currentUser.id);

  if (!data.length) return <EmptyState />;

  return (
    <div
      className="
      max-w-7xl
      mx-auto
      px-4
      md:px-8
      pb-10
      min-h-[50vh]
      "
    >
      <h1 className="text-2xl font-bold">My Purchased products</h1>
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
        {data.map((item) => (
          <PurchasedProductCard
            key={item.id}
            item={item.product}
            user={item.user}
          />
        ))}
      </div>
    </div>
  );
}
