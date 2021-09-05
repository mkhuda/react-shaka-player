// Plugins
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import strip from "@rollup/plugin-strip";

// Dev Plugins
import alias from "@rollup/plugin-alias";
import copy from "rollup-plugin-copy";
import html2 from "rollup-plugin-html2";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";

let builds = [];

const defaultPlugins = [
  replace({
    "process.env.NODE_ENV": JSON.stringify("development"),
    preventAssignment: true,
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
];

const distBuildConfig = {
  input: "src/index.tsx",
  output: {
    name: "ReactShakaPlayer",
    file: "dist/index.js",
    format: process.env.DEV ? "esm" : "cjs",
    exports: "named",
    globals: {
      react: "react",
      "react-dom": "react-dom",
    },
  },
  external: ["react"],
  plugins: defaultPlugins,
};

builds.push(distBuildConfig);

if (process.env.DEV) {
  const devPlugins = [
    ...defaultPlugins,
    copy({
      targets: [
        {
          src: "src/styles/ui.css",
          dest: "dist",
        },
      ],
    }),
    serve("dist"),
    html2({
      fileName: "index.html",
      template: "demo/index.html",
    }),
    postcss(),
    alias({
      entries: [
        {
          find: "@mkhuda/react-shaka-player",
          replacement: "../dist/index.js",
        },
      ],
    }),
  ];

  const devOutputBuildConfig = {
    input: "demo/index.js",
    output: {
      file: "dist/demo.js",
      format: "esm",
      exports: "auto",
    },
    plugins: devPlugins,
  };

  builds.push(devOutputBuildConfig);
}

export default builds;
