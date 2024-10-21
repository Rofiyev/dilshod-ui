"use client";

import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { navbarLinks } from "@/constants";
import { INavabarLink } from "@/types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

const MobileMenu = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="
        flex
        flex-col
        justify-between
        h-screen
        "
      >
        <div>
          <div className="w-full mt-4">
            <Link href="/" className="flex items-center">
              <Image src="/images/logo.png" width={40} height={40} alt="Logo" />
              <h3 className="text-2xl font-semibold">
                Dilshod <span className="text-sky-600">UI</span>
              </h3>
            </Link>
          </div>

          <div
            className="
            mt-4
            flex
            px-2
            space-y-1
            flex-col
            "
          >
            {navbarLinks.map(({ id, label, href }: INavabarLink) => (
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
        </div>
        <div className="w-full">
          <p
            className="
            text-[10px]
            text-neutral-700
            text-center
            "
          >
            &copy;{new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
