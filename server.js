import express from "express";
import chokidar from "chokidar";

const PORT = 3000;
const app = express();

app.use(express.static(import.meta.dirname));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const watcher = chokidar.watch("./", {
  ignored: (path, stats) =>
    path.startsWith("node_modules") ||
    (stats?.isFile() && !path.endsWith(".js")),
  persistent: true,
});

watcher.on("change", (path) => console.log(`File ${path} has been changed`));
