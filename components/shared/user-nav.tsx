"use client";

import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LogOut,
  Store,
  Settings,
  ShoppingBag,
  BadgeDollarSign,
  ShoppingBasketIcon,
} from "lucide-react";
import type { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";

interface UserNavProps {
  currentUser: KindeUser<Record<string, any>>;
}

const UserNav: FC<UserNavProps> = ({ currentUser }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-10 rounded-full">
          <Avatar className="cursor-pointer size-10">
            {currentUser.picture && (
              <AvatarImage
                className="size-full object-cover"
                src={currentUser.picture}
                alt="Avatar"
              />
            )}
            <AvatarFallback>
              {currentUser.given_name?.slice(0, 1)}
              {currentUser.family_name?.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div
            className="
            flex
            flex-col
            space-y-1
            "
          >
            <p
              className="
              text-sm
              font-medium
              leading-none
              "
            >
              {currentUser.given_name} {currentUser.family_name}
            </p>
            <p
              className="
              text-xs
              leading-none
              text-muted-foreground
              "
            >
              {currentUser.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/sell" className="flex gap-x-1">
              <Store size={18} />
              <span className="text-neutral-900">Sell your product</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/my-products" className="flex gap-x-1">
              <ShoppingBag size={18} />
              <span className="text-neutral-900">My products</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/billing" className="flex gap-x-1">
              <BadgeDollarSign size={18} />
              <span className="text-neutral-900">Billing</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/my-buy" className="flex gap-x-1">
              <ShoppingBasketIcon size={18} />
              <span className="text-neutral-900">My purchase</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex gap-x-1">
              <Settings size={18} />
              <span className="text-neutral-900">Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <LogoutLink className="flex gap-x-1">
            <LogOut size={18} />
            <span>Log out</span>
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
