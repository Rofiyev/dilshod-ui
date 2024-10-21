import SettingsForm from "@/components/shared/settings-form";
import Unauthorized from "@/components/shared/unauthorized";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/prismadb";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
    },
  });

  return data;
}

export default async function SettingsPage() {
  noStore();
  const { getUser } = await getKindeServerSession();
  const currentUser = await getUser();

  if (!currentUser) return <Unauthorized />;

  const data = await getData(currentUser.id);

  return (
    <section
      className="
      max-w-7xl
      mx-auto
      px-4
      md:px-8
      "
    >
      <Card>
        <SettingsForm
          email={data?.email ?? ""}
          firstName={data?.firstName ?? ""}
          lastName={data?.lastName ?? ""}
        />
      </Card>
    </section>
  );
}
