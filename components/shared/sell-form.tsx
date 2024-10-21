"use client";

import { useEffect, useState } from "react";
import SelectCategory from "@/components/shared/select-category";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";
import { JSONContent } from "@tiptap/react";
import dynamic from "next/dynamic";
import { IState } from "@/types";
import { useFormState } from "react-dom";
import { sellProduct } from "@/actions";
import { cn } from "@/lib/utils";
import SubmitButton from "@/components/shared/submit-button";
import { redirect } from "next/navigation";

const TipTapEditor = dynamic(() => import("@/components/shared/editor"), {
  ssr: false,
});

const SellForm = () => {
  const initalState: IState = { status: undefined, message: "" };
  const [state, formAction] = useFormState(sellProduct, initalState);

  const [json, setJson] = useState<JSONContent | null>(null);
  const [images, setImages] = useState<string[] | null>(null);
  const [productFile, setProductFile] = useState<string | null>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message!);
      return redirect("/");
    } else if (state.status === "error") toast.error(state.message!);
  }, [state]);

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
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Sell your product with ease</CardTitle>
            <CardDescription>
              Please describe your product here in detail so that it can be sold
            </CardDescription>
          </CardHeader>
          <CardContent
            className="
            flex
            flex-col
            gap-y-6
            "
          >
            <div className="flex gap-2 w-full">
              <div className="flex flex-col w-full md:w-1/2">
                <Label className="mb-2">Name</Label>
                <Input
                  type="text"
                  placeholder="Name of your product"
                  name="name"
                />
                {state?.errors?.["name"]?.[0] && (
                  <p className="text-destructive text-sm/4 mt-1 ml-1">
                    {state?.errors?.["name"]?.[0]}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <Label className="mb-2">Price</Label>
                <Input placeholder="Price" type="number" name="price" min={0} />
                {state?.errors?.["price"]?.[0] && (
                  <p className="text-destructive text-sm/4 mt-1 ml-1">
                    {state?.errors?.["price"]?.[0]}
                  </p>
                )}
              </div>
            </div>
            <div
              className="
              flex
              flex-col
              gap-y-2
              "
            >
              <Label>Category</Label>
              <SelectCategory />
              {state?.errors?.["category"]?.[0] && (
                <p className="text-destructive text-sm/4 mt-1 ml-1">
                  {state?.errors?.["category"]?.[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <Label className="mb-2">Small Summary</Label>
              <Textarea
                placeholder="Please describe your product shortly right here..."
                name="smallDescription"
              />
              {state?.errors?.["smallDescription"]?.[0] && (
                <p className="text-destructive text-sm/4 mt-1 ml-1">
                  {state?.errors?.["smallDescription"]?.[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <input
                type="hidden"
                name="description"
                value={JSON.stringify(json)}
              />
              <Label className="mb-2">Description</Label>
              <TipTapEditor json={json} setJson={setJson} />
              {state?.errors?.["description"]?.[0] && (
                <p className="text-destructive text-sm/4 mt-1 ml-1">
                  {state?.errors?.["description"]?.[0]}
                </p>
              )}
            </div>
            <div
              className="
              flex
              flex-col
              gap-y-2
              "
            >
              <input
                type="hidden"
                name="images"
                value={JSON.stringify(images)}
              />
              <Label>Product Images</Label>
              <UploadButton
                appearance={{
                  button: state?.errors?.["images"]?.[0]
                    ? "bg-rose-500"
                    : "bg-primary text-primary-foreground shadow hover:bg-primary/90",
                }}
                className={cn(
                  "border p-10 rounded-lg border-dashed",
                  state?.errors?.["images"]?.[0] && "border-rose-500"
                )}
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImages(res.map((item) => item.url));
                  toast.success("Successfully!");
                }}
                onUploadError={(error: Error) => {
                  toast.error("Something went wrong!");
                }}
              />
            </div>
            <div
              className="
              flex
              flex-col
              gap-y-2
              "
            >
              <input
                type="hidden"
                value={productFile ?? ""}
                name="productFile"
              />
              <Label>Product File</Label>
              <UploadDropzone
                disabled={false}
                appearance={{
                  button: state?.errors?.["productFile"]?.[0]
                    ? "bg-rose-500"
                    : "bg-primary text-primary-foreground shadow hover:bg-primary/90",
                }}
                className={cn(
                  "border p-10 rounded-lg border-dashed",
                  state?.errors?.["productFile"]?.[0] && "border-rose-500"
                )}
                endpoint="productFileUpload"
                onClientUploadComplete={(res) => {
                  setProductFile(res[0].url);
                  toast.success("Successfully!");
                }}
                onUploadError={(error: Error) => {
                  toast.error("Something went wrong!");
                }}
              />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton title="Create your product" />
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default SellForm;
