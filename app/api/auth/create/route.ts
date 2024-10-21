import prisma from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  noStore();
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  if (!currentUser || !currentUser.id) throw new Error("Something went wrong!");

  let user = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
  });

  if (!user) {
    const account = await stripe.accounts.create({
      email: currentUser.email!,
      controller: {
        losses: { payments: "application" },
        fees: { payer: "application" },
        stripe_dashboard: { type: "express" },
      },
    });

    user = await prisma.user.create({
      data: {
        id: currentUser.id,
        firstName: currentUser.given_name ?? "",
        lastName: currentUser.family_name ?? "",
        email: currentUser.email ?? "",
        profileImage: currentUser.picture ?? "",
        connectedAccountId: account.id,
      },
    });
  }

  return NextResponse.redirect(process.env.NEXT_PUBLIC_SITE_URL!);
}
