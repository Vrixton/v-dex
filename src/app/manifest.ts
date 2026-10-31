import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "V-DEX — Victor Villavicencio",
    short_name: "V-DEX",
    description: "A portfolio shaped like a handheld device.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#031016",
    theme_color: "#dc0a2d",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
