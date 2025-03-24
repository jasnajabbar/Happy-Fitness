// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//     plugins: [react()],
//     root: '.', // Set to current directory
//     build: {
//         outDir: 'dist', // Ensure dist is created inside the project
//         assetsDir: 'assets', // Store assets in dist/assets
//         emptyOutDir: true, // Cleans dist before build
//         rollupOptions: {
//             input: 'public/index.html', // Correct way to set input file
//         }
//     }
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".", // Ensure Vite knows where `index.html` is
  build: {
    outDir: "dist",
  },
});
