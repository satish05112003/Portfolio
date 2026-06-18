import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nagalla Satish Portfolio",
    short_name: "Satish Portfolio",
    description: "Personal engineering portfolio of Nagalla Satish.",
    start_url: "/",
    display: "standalone",
    background_color: "#080807",
    theme_color: "#00698c",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
