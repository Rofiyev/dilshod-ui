import { ICategoryItem, INavabarLink } from "@/types";

export const navbarLinks: INavabarLink[] = [
  {
    id: 1,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    label: "Templetes",
    href: "/products/template",
  },
  {
    id: 3,
    label: "Ui Kits",
    href: "/products/uikit",
  },
  {
    id: 4,
    label: "Icons",
    href: "/products/icon",
  },
];

export const categoryItems: ICategoryItem[] = [
  {
    id: 1,
    name: "template",
    title: "Template",
    image: "/icons/globe.png",
  },
  {
    id: 2,
    name: "uikit",
    title: "UI Kit",
    image: "/icons/chef-hat.png",
  },
  {
    id: 3,
    name: "icon",
    title: "Icon",
    image: "/icons/party-popper.png",
  },
];
