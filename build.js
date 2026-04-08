import * as sass from "sass";

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
    const result = sass.compile("src/styles/main.scss", {
        style: "compressed",
        sourceMap: false,
    });
    await Bun.write("static/styles/main.min.css", result.css);
    console.log("✓ SCSS compiled & minified → static/styles/main.min.css");
}

async function bustCache() {
    const hasher = new Bun.CryptoHasher("md5");

    const [jsFile, cssFile, htmlFile] = await Promise.all([
        Bun.file("static/script/main.min.js").arrayBuffer(),
        Bun.file("static/styles/main.min.css").arrayBuffer(),
        Bun.file("index.html").text(),
    ]);

    const jsHash = hasher.update(jsFile).digest("hex").slice(0, 8);
    hasher.update(""); // reset
    const cssHash = new Bun.CryptoHasher("md5").update(cssFile).digest("hex").slice(0, 8);

    const updatedHtml = htmlFile
        .replace(
            /main\.min\.js(\?bust=[a-f0-9]*)?/,
            `main.min.js?bust=${jsHash}`
        )
        .replace(
            /main\.min\.css(\?bust=[a-f0-9]*)?/,
            `main.min.css?bust=${cssHash}`
        );

    await Bun.write("index.html", updatedHtml);
    console.log(`✓ Cache bust → JS: ${jsHash}, CSS: ${cssHash}`);
}

async function build() {
    console.log("Building...");
    await Promise.all([buildJS(), buildCSS()]);

    if (!isWatch) {
        await bustCache();
    }

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
