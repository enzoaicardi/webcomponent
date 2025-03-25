import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

const formats = ["iife", "esm", "cjs", "umd"];
const files = ["client", "server"];

export default formats
    .map(function (format) {
        return files.map(function (file) {
            return {
                input: `src/@enzoaicardi/${file}.ts`,
                output: {
                    file: `dist/${format}/${file}.${
                        format === "cjs" ? "cjs" : "js"
                    }`,
                    format: format,
                    name:
                        (format === "iife" || format === "umd") &&
                        "WebComponent",
                    minifyInternalExports: true,
                },
                plugins: [
                    typescript({
                        module: "esnext",
                        compilerOptions: {
                            target: "esnext",
                        },
                        rootDir: "src",
                    }),
                    terser({
                        mangle: {
                            properties: {
                                reserved: [
                                    "tagName",
                                    "define",
                                    "attrs",
                                    "connectedCallback",
                                    "render",
                                    "renderAsync",
                                    "toString",
                                ],
                            },
                        },
                    }),
                ],
            };
        });
    })
    .flat();
