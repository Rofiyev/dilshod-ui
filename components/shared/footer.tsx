"use client";

import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import Logo from "@/components/shared/logo";

const Footer = () => {
  return (
    <>
      <div className="px-4 pt-8 mt-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 border-t">
        <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <Logo />
            <div className="mt-6 lg:max-w-sm">
              <p className="text-sm text-gray-800">
                At DilshodUI, we strive to deliver high-quality, customizable
                templates for designers, developers, and businesses alike. Our
                marketplace offers a wide range of UI kits, icons, and design
                resources, all crafted to meet the latest trends and user
                experience standards.
              </p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-base font-bold tracking-wide text-gray-900">
              Contacts
            </p>
            <div className="flex">
              <p className="mr-1 text-gray-800">Phone:</p>
              <Link
                href="tel:77-777-77-77"
                aria-label="Our phone"
                title="Our phone"
                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                77 777 77 77
              </Link>
            </div>
            <div className="flex">
              <p className="mr-1 text-gray-800">Email:</p>
              <Link
                href="mailto:rofiyevdilshod@gmail.com"
                aria-label="Our email"
                title="Our email"
                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                rofiyevdilshod@gmail.com
              </Link>
            </div>
            <div className="flex">
              <p className="mr-1 text-neutral-800">Address:</p>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Our address"
                title="Our address"
                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                Samarkhand, Uzbekistan
              </a>
            </div>
          </div>
          <div>
            <span className="text-base font-bold tracking-wide text-gray-900">
              Social
            </span>
            <div className="flex items-center mt-1 space-x-3">
              <Link
                href="https://x.com/rof1yev"
                target="_blank"
                className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <TwitterLogoIcon className="size-6" />
              </Link>
              <Link
                href="https://www.instagram.com/rof1yev"
                target="_blank"
                className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <InstagramLogoIcon className="size-6" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/dilshod-rofiyev-25635a270"
                target="_blank"
                className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <LinkedInLogoIcon className="size-6" />
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Follow us for the latest updates, new template releases, design
              tips, and exclusive offers.
            </p>
          </div>
        </div>
        <div className="flex justify-center pt-5 pb-10 border-t">
          <p className="text-sm text-gray-600">
            &copy;Copyright {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
