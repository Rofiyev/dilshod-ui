"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { productSchema, userSettingsSchema } from "@/schema";
import { IState } from "@/types";
import { CATEGORY_TYPES } from "@prisma/client";
import prisma from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export const sellProduct = async (prevState: any, formData: FormData) => {
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  if (!currentUser || !currentUser.id)
    throw new Error("currentUser data is required!");

  const validateFields = productSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    price: Number(formData.get("price")),
    smallDescription: formData.get("smallDescription"),
    description: formData.get("description"),
    images: JSON.parse(formData.get("images") as string),
    productFile: formData.get("productFile"),
  });

  if (!validateFields.success) {
    const state: IState = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "Oops, I think there is a mistake with your inputs!",
    };

    return state;
  }

  const {
    category,
    description,
    images,
    name,
    price,
    productFile,
    smallDescription,
  } = validateFields.data;

  await prisma.product.create({
    data: {
      userId: currentUser.id,
      name,
      category: category as CATEGORY_TYPES,
      description: JSON.parse(description),
      images,
      price,
      productFile,
      smallDescription,
    },
  });

  const state: IState = {
    status: "success",
    message: "Your product has been created!",
  };

  return state;
};

export const updateUserSettings = async (
  prevState: any,
  formData: FormData
) => {
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  if (!currentUser || !currentUser.id)
    throw new Error("currentUser data is required!");

  const validateFields = userSettingsSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  if (!validateFields.success) {
    const state: IState = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "Oops, I think there is a mistake with your inputs!",
    };
    return state;
  }

  const data = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      firstName: validateFields.data.firstName,
      lastName: validateFields.data.lastName,
    },
  });

  return redirect(`/product/${data.id}`);
};

export async function buyProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  const id = formData.get("id") as string | null;

  if (!id) throw new Error("Product ID is required.");

  const data = await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      price: true,
      name: true,
      smallDescription: true,
      images: true,
      user: {
        select: {
          connectedAccountId: true,
        },
      },
    },
  });

  if (!data) throw new Error("Incomplete product data.");

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: Math.round(Number(data?.price) * 100),
          product_data: {
            name: data?.name,
            description: data?.smallDescription,
            images: data?.images ?? data.images[0],
          },
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      application_fee_amount: Math.round(Number(data?.price) * 100) * 0.1,
      transfer_data: {
        destination: data.user?.connectedAccountId as string,
      },
    },
    metadata: {
      productId: data.id,
      userId: currentUser.id,
    },
    success_url: `${process.env
      .NEXT_PUBLIC_SITE_URL!}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL!}/payment/cancel`,
  });

  return redirect(session.url!);
}

export async function createStripeAccountLink() {
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  if (!currentUser) throw new Error("currentUser must to be here!");

  const data = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
    select: {
      connectedAccountId: true,
    },
  });

  const accountLink = await stripe.accountLinks.create({
    account: data?.connectedAccountId as string,
    refresh_url: `${process.env.NEXT_PUBLIC_SITE_URL!}/billing`,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL!}/return/${
      data?.connectedAccountId
    }`,
    type: "account_onboarding",
  });

  await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      stripeConnectedLinked: true,
    },
  });

  return redirect(accountLink.url);
}

export async function getStripeDashboardLink() {
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  if (!currentUser) throw new Error("currentUser must to be here!");

  const data = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
    select: {
      connectedAccountId: true,
    },
  });

  const loginLink = await stripe.accounts.createLoginLink(
    data?.connectedAccountId as string
  );

  return redirect(loginLink.url);
}
