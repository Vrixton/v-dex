import pkg from "../../package.json";

/**
 * Versión de la app, leída de package.json para que la UI y el código
 * nunca se desincronicen. Úsala solo en Server Components: así el
 * package.json completo no termina en el bundle del navegador.
 */
export const APP_VERSION: string = pkg.version;
