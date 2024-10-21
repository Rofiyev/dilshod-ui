"use client";

import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center w-fit pr-2">
      <Image src="/images/logo.png" width={40} height={40} alt="Logo" />
      <h3 className="hidden sm:inline-flex text-2xl font-semibold">
        Dilshod <span className="text-sky-600">UI</span>
      </h3>
    </Link>
  );
};

export default Logo;
