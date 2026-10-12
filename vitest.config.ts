import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

/**
 * Configuración de pruebas.
 *
 * jsdom porque ya hay componentes que probar, no solo funciones. El alias "@"
 * se declara también aquí: tsc lo entiende por tsconfig, pero vitest no, y sin
 * esto cualquier prueba que lo use falla al importar.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
