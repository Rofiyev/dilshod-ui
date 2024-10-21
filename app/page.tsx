import { Suspense } from "react";
import ProductRow from "@/components/shared/product-row";
import ProductRowLoading from "@/components/shared/product-row-loading";

export default function Home() {
  return (
    <div
      className="
      max-w-7xl
      mx-auto
      px-4
      md:px-8
      py-5
      "
    >
      <div
        className="
        max-w-3xl
        mx-auto
        text-2xl
        sm:text-5xl
        lg:text-6xl
        font-semibold
        text-center
        mt-6
        "
      >
        <h1>Find the best Tailwind</h1>
        <h1 className="text-sky-600">Templates & Icons</h1>
        <p
          className="
          lg:text-lg
          text-muted-foreground
          mx-auto
          mt-5
          w-[90%]
          font-normal
          text-base
          "
        >
          <a href="/" className="font-semibold text-neutral-700">
            Dilshod <span className="text-sky-600">UI</span>
          </a>{" "}
          stands out as the premier marketplace for all things related to
          tailwindcss, offering an unparalleled platform for both sellers and
          buyers alike.
        </p>
      </div>

      <Suspense fallback={<ProductRowLoading />}>
        <ProductRow category="newest" />
      </Suspense>
      <Suspense fallback={<ProductRowLoading />}>
        <ProductRow category="templates" />
      </Suspense>
      <Suspense fallback={<ProductRowLoading />}>
        <ProductRow category="icons" />
      </Suspense>
      <Suspense fallback={<ProductRowLoading />}>
        <ProductRow category="uikits" />
      </Suspense>
    </div>
  );
}
