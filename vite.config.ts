import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    root: "app",
    base: "/", // or "/your-repo-name/" if using a subfolder on GH Pages
    plugins: [react(), tsconfigPaths()],
    build: {
        outDir: "../dist",
        emptyOutDir: true,
    },
});
