import SellForm from "@/components/shared/sell-form";
import Unauthorized from "@/components/shared/unauthorized";
import prisma from "@/lib/prismadb";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
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

export default async function SellPage() {
  noStore();
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  if (!currentUser) <Unauthorized />;

  await getData(currentUser.id);

  return (
    <section
      className="
      max-w-7xl
      mx-auto
      px-4
      md:px-8
      pb-5
      md:pb-10
      "
    >
      <SellForm />
    </section>
  );
}
