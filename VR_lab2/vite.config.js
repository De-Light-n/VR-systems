import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig(({ command }) => ({
  base: "/VR-systems/",
  plugins: command === "serve" ? [basicSsl()] : [],
  server: {
    host: true,
  },
}));
