import express from "express";
import chokidar from "chokidar";
import http from "node:http";
import { WebSocket, WebSocketServer } from "node:http";

const PORT = 3000;
const app = express();
const server = http.createServer(app);
const ws = new WebSocketServer({ server });

let socket;
ws.on("connection", (_socket) => {
  socket = _socket;
});

const watcher = chokidar.watch("./", {
  ignored: (path, stats) =>
    path.startsWith("node_modules") ||
    (stats?.isFile() && !path.endsWith(".js")),
  persistent: true,
});

watcher.on("change", (path) => console.log(`File ${path} has been changed`));

app.use(express.static(import.meta.dirname));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
