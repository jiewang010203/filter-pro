import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import serve from "rollup-plugin-serve";

const name = require("./package.json").main.replace(/\.js$/, "");

const bundle = (config) => ({
  ...config,
  input: "src/index.ts",
  // todo: resolve problem about externals
});

export default [
  bundle({
    plugins: [
      esbuild(),
      serve({
        contentBase: "./dist", // 指定服务器的根目录
        port: 8000, // 指定服务器的端口号
      }),
    ],
    output: [
      {
        file: `${name}.js`,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: `${name}.mjs`,
        format: "es",
        sourcemap: true,
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `${name}.d.ts`,
      format: "es",
    },
  }),
];
