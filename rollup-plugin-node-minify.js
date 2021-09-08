import fs from "fs";
import path from "path";
import minifyCore from "@node-minify/core";
import cleanCss from "@node-minify/clean-css";

const name = "node-minify";
const exec = async (input, output) => {
  await minifyCore({ compressor: cleanCss, input: input, output: output });
};

const minifyCss = (options) => {
  const { input = "", output = "" } = options;
  return {
    name,
    transform() {
      // add current input into rollup watch file
      this.addWatchFile(path.join(__dirname, input));
    },
    writeBundle: async () => {
      // get output dirname
      const outputDir = path.dirname(output);

      // for in case, if directory was not found
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // execute
      return await exec(input, output);
    },
  };
};

export default minifyCss;
