// Plugins
import analyze from 'rollup-plugin-analyzer'
import commonjs from "@rollup/plugin-commonjs";
import minifyCss from "./rollup-plugin-node-minify";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import replace from "@rollup/plugin-replace";
import strip from "@rollup/plugin-strip";
import typescript from "@rollup/plugin-typescript";
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const defaultPlugins = [
  peerDepsExternal(),
  replace({
    "process.env.NODE_ENV": JSON.stringify("development"),
    preventAssignment: true,
  }),
  terser({
    format: {
      comments: false,
    },
  }),
  babel({
    exclude: "node_modules/**",
  }),
  nodeResolve(),
  commonjs(),
  typescript({
    tsconfig: "./tsconfig.json",
    lib: ["es5", "es6", "dom"],
    target: "es5",
  }),
  strip(),
  minifyCss({
    input: "src/styles/ui.css",
    output: "dist/ui.css",
  }),
  analyze(),
];

const distBuildConfig = {
  input: "src/index.tsx",
  output: {
    name: "ReactShakaPlayer",
    file: "dist/index.js",
    format: "cjs",
    exports: "named",
    globals: {
      react: "react",
      "react-dom": "react-dom",
    },
  },
  external: ["react", "shaka-player"],
  plugins: defaultPlugins,
};

const builds = distBuildConfig;

export default builds;
