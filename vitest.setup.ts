import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

/** Sin esto, cada prueba hereda el DOM de la anterior. */
afterEach(() => {
  cleanup();
});
