import express from "express";
import chokidar from "chokidar";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { WebSocket, WebSocketServer } from "ws";

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

const hmrMiddleware = async (req, res, next) => {
  if (!req.url.endsWith(".js")) return next();

  const requestedFile = await fs.readFile(
    path.join(process.cwd(), req.url),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data);
    },
  );

  console.log(req.url);
  console.log(requestedFile);
  next();

  res.send(requestedFile);
};

app.use(hmrMiddleware);
app.use(express.static(import.meta.dirname));

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
