import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    // Isso aqui avisa o Vite para ignorar o PostCSS e parar de procurar o arquivo deletado
    postcss: {
      plugins: [],
    },
  },
});
