import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  basePath: "/colors-test-dashboard",
  images: { unoptimized: true },
};

export default config;
