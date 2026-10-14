import type { Messages } from "@/i18n/messages";

export type MenuItemId = keyof Messages["device"]["menu"]["items"];

export type MenuItem = {
  id: MenuItemId;
  href: string;
};

export const MENU_ITEMS: readonly MenuItem[] = [
  { id: "about", href: "/" },
  { id: "experience", href: "/experience" },
  { id: "projects", href: "/projects" },
  { id: "contact", href: "/contact" },
];
