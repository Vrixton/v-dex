export type MenuItem = {
  label: string;
  href: string;
  /** Línea que escribe la terminal cuando el ítem está activo. */
  terminal: string;
};

export const MENU_ITEMS: readonly MenuItem[] = [
  { label: "About me", href: "/", terminal: "Trainer data and skill set" },
  { label: "Work Experience", href: "/experience", terminal: "Expedition log" },
  { label: "Projects", href: "/projects", terminal: "Challenge logs database" },
  { label: "Contact me", href: "/contact", terminal: "Open a comm channel" },
];

export const MENU_IDLE_MESSAGE = "Select one option to proceed";
