import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const SRC = join(process.cwd(), "src");

function tsxFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return tsxFiles(full);
    return full.endsWith(".tsx") ? [full] : [];
  });
}

describe("reduced motion", () => {
  it("guards every animate- utility with a motion variant", () => {
    const unguarded = tsxFiles(SRC).flatMap((file) =>
      readFileSync(file, "utf8")
        .split("\n")
        .flatMap((line, index) =>
          (line.match(/[^\s"'`]*animate-[a-z-]+/g) ?? [])
            .filter((token) => !/motion-(safe|reduce):/.test(token))
            .map((token) => `${file}:${index + 1} ${token}`),
        ),
    );

    expect(unguarded).toEqual([]);
  });
});
