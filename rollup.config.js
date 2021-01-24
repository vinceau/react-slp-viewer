import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import sass from "rollup-plugin-sass";
import image from "@rollup/plugin-image";

import pkg from "./package.json";

const minifyExtension = (pathToFile) => pathToFile.replace(/\.js$/, ".min.js");

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: minifyExtension(pkg.main),
      format: "cjs",
      sourcemap: false,
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    terser({
      include: [/^.+\.min\.js$/],
    }),
    peerDepsExternal(),
    resolve(),
    commonjs({
      exclude: ["node_modules/react-svg-unique-id/**/*.js"],
    }),
    typescript({ useTsconfigDeclarationDir: true }),
    image(),
    sass({
      insert: true,
    }),
  ],
};
