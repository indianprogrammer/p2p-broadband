import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // eslint-plugin-react uses context.getFilename(), which ESLint 10 removed,
  // only during React version auto-detection ("detect"). Specify the version
  // explicitly to avoid the crash. https://github.com/vercel/next.js/issues/89764
  {
    settings: {
      react: {
        version: "19",
      },
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;