export type MenuItem = {
  label: string;
  href: string;
  /** Línea que escribe la terminal cuando el ítem está activo. */
  terminal: string;
};

export const MENU_ITEMS: readonly MenuItem[] = [
  { label: "About me", href: "/", terminal: "Trainer data and skill set" },
  { label: "Work experience", href: "/experience", terminal: "Expedition log" },
  { label: "Projects", href: "/projects", terminal: "Challenge log database" },
  { label: "Contact me", href: "/contact", terminal: "Open a comm channel" },
];

export const MENU_IDLE_MESSAGE = "Select an option to proceed";
