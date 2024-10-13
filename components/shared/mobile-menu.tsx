"use client";

import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { navbarLinks } from "@/constants";
import { INavabarLink } from "@/types";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MobileMenu = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div
          className="
          mt-8
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
