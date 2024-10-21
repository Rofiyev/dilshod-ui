import { createStripeAccountLink, getStripeDashboardLink } from "@/actions";
import SubmitButton from "@/components/shared/submit-button";
import Unauthorized from "@/components/shared/unauthorized";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prismadb";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
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

  return data;
}

export default async function BillingPage() {
  noStore();
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  if (!currentUser) return <Unauthorized />;

  const data = await getData(currentUser.id);

  return (
    <div
      className="
      max-w-7xl
      mx-auto
      px-4
      md:px-8
      min-h-[50vh]
      "
    >
      <Card className="p-4 md:p-10">
        <CardTitle className="md:text-3xl">Billing</CardTitle>
        <CardDescription>
          Find all your details regarding your payments
        </CardDescription>
        <CardContent className="p-0 mt-4">
          {!data?.stripeConnectedLinked && (
            <form action={createStripeAccountLink}>
              <SubmitButton title="Link your Accounts to Stripe" />
            </form>
          )}
          {data?.stripeConnectedLinked && (
            <form action={getStripeDashboardLink}>
              <SubmitButton title="View Dashboard" />
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
