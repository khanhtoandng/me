import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 3000,
  },

  define: {
    "process.env": process.env, // Ensuring that environment variables are properly defined
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Setting up alias for src directory
    },
  },
});
