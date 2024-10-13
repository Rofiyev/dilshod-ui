"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navbarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { INavabarLink } from "@/types";
import MobileMenu from "./mobile-menu";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div
      className="
      relative
      max-w-7xl
      w-full
      flex
      md:grid
      md:grid-cols-12
      items-center
      px-4
      md:px-8
      mx-auto
      py-7
      "
    >
      <div className="md:col-span-3">
        <Link href="/">
          <h3 className="text-2xl font-semibold">
            Dilshod <span className="text-sky-600">UI</span>
          </h3>
        </Link>
      </div>

      <div
        className="
        hidden
        md:flex
        justify-center
        items-center
        col-span-6
        gap-x-2
        "
      >
        {navbarLinks.map(({ id, href, label }: INavabarLink) => (
          <Link
            key={`nav-link-item-${id}`}
            href={href}
            className={cn(
              `group
            items-center
            p-2
            font-medium
            rounded-md
            flex`,
              pathname === href
                ? "bg-muted text-sky-600"
                : "hover:bg-muted hover:opacity-75"
            )}
          >
            {label}
          </Link>
        ))}
      </div>

      <div
        className="
        flex
        items-center
        gap-x-2
        ms-auto
        md:col-span-3
        "
      >
        <Button variant="secondary">Sign In</Button>
        <Button>Sign Up</Button>
      </div>

      <div className="md:hidden ml-2">
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
