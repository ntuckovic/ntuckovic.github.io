import { $ } from "bun";

const isWatch = process.argv.includes("--watch");

async function buildJS() {
    const result = await Bun.build({
        entrypoints: ["./src/script/main.js"],
        outdir: "./static/script",
        minify: true,
        format: "esm",
        naming: "[name].min.[ext]",
    });

    if (!result.success) {
        console.error("JS build failed:", result.logs);
        return false;
    }
    console.log("✓ JS bundled & minified → static/script/main.min.js");
    return true;
}

async function buildCSS() {
    await $`bunx sass src/styles/main.scss static/styles/main.min.css --style=compressed --no-source-map`;
    console.log("✓ SCSS compiled & minified → static/styles/main.min.css");
}

async function build() {
    console.log("Building...");
    await Promise.all([buildJS(), buildCSS()]);
    console.log("Done!");
}

await build();

if (isWatch) {
    const { watch } = await import("fs");

    console.log("\nWatching for changes...");

    watch("./src/script", { recursive: true }, async (event, filename) => {
        console.log(`\n[JS] ${filename} changed`);
        await buildJS();
    });

    watch("./src/styles", { recursive: true }, async (event, filename) => {
        console.log(`\n[CSS] ${filename} changed`);
        await buildCSS();
    });
}
