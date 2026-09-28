import { statSync } from "node:fs";
import path from "node:path";

import { CV_FILE } from "@/content/contact";

/**
 * Tamaño del CV, leído del archivo real en tiempo de build.
 *
 * El nombre del archivo vive en el contenido y no aquí: así un componente
 * de cliente puede importarlo sin arrastrar node:fs, que solo existe en el
 * servidor.
 */
export function readCvSize(): string {
  try {
    const stats = statSync(path.join(process.cwd(), "public", CV_FILE));
    return `${Math.round(stats.size / 1024)} KB`;
  } catch {
    return "—";
  }
}
