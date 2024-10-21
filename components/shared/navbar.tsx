"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import type { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { Button } from "@/components/ui/button";
import type { INavabarLink } from "@/types";
import { navbarLinks } from "@/constants";
import MobileMenu from "@/components/shared/mobile-menu";
import UserNav from "@/components/shared/user-nav";
import Logo from "@/components/shared/logo";

interface NavbarProps {
  currentUser: KindeUser<Record<string, any>>;
}

const Navbar: FC<NavbarProps> = ({ currentUser }) => {
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
        <Logo />
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
        {currentUser ? (
          <UserNav currentUser={currentUser} />
        ) : (
          <div
            className="
            flex
            items-center
            gap-x-2
            "
          >
            <Button variant="secondary" asChild>
              <LoginLink>Sign In</LoginLink>
            </Button>
            <Button asChild>
              <RegisterLink>Sign Up</RegisterLink>
            </Button>
          </div>
        )}
      </div>

      <div className="md:hidden ml-2">
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
