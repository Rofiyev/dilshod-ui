import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prismadb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");

  if (!session_id)
    return NextResponse.json({ message: "Invalid ID!" }, { status: 400 });

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      if (session.metadata) {
        const productId = session.metadata.productId;
        const userId = session.metadata.userId;

        const data = await prisma.purchase.findMany({
          where: {
            OR: [{ userId }, { productId }],
          },
        });

        if (!data.length) {
          await prisma.purchase.create({
            data: {
              userId: userId,
              productId: productId,
            },
          });

          return NextResponse.json({ status: 200 });
        }
      }
    }

    return NextResponse.json({ message: "Invalid Data!" }, { status: 400 });
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
}
