import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  e2e: {
    specPattern: "src/Tests/*.cy.{js,jsx,ts,tsx}",
    supportFile: false,
    testIsolation: false,
  },
});
