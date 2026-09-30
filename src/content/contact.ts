/**
 * Canales de contacto.
 *
 * El correo va aparte porque es el canal principal: se copia con un clic en
 * lugar de abrir un cliente de correo, que en un ordenador ajeno o sin
 * configurar no lleva a ninguna parte.
 */

export const CONTACT = {
  intro: "If you want to get in touch",
  email: "victor.villavicencio.10@gmail.com",
  networks: [
    { name: "GitHub", href: "https://github.com/Vrixton", icon: "github" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/vrixton/", icon: "linkedin" },
  ],
} as const;
export const CV_FILE = "victor-villavicencio-cv.pdf";
