const fs = require("fs");
fs.rmSync("dist", { recursive: true, force: true });
fs.cpSync("public", "dist", { recursive: true });
fs.cpSync("src", "dist/src", { recursive: true });
console.log("Build complete");
