import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import vitePluginImp from "vite-plugin-imp";
import customAntdLessVariables from "./src/style/ant-theme";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  plugins: [
    react(),
    vitePluginImp({
      optimize: true,
      libList: [
        {
          libName: "lodash",
          libDirectory: "",
          camel2DashComponentName: false,
        },
        {
          libName: "antd",
          libDirectory: "es",
          style: (name) =>
            name === "theme" ? `antd/es/${name}` : `antd/es/${name}/style`,
        },
      ],
    }),
  ],

  css: {
    preprocessorOptions: {
      less: {
        modifyVars: customAntdLessVariables,
        javascriptEnabled: true,
      },
    },
  },

  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
});
