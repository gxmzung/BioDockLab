const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 5173;
const ROOT = path.join(__dirname, "..");
const FRONTEND_DIR = path.join(ROOT, "frontend");
const DATA_PATH = path.join(ROOT, "data", "sample", "bio_experiments.json");

function send(res, status, contentType, body) {
  res.writeHead(status, { "Content-Type": contentType + "; charset=utf-8" });
  res.end(body);
}

function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      send(res, 404, "text/plain", "Not Found");
      return;
    }
    send(res, 200, contentType, data);
  });
}

const server = http.createServer((req, res) => {
  const url = req.url.split("?")[0];

  if (url === "/") {
    return serveFile(res, path.join(FRONTEND_DIR, "bio_ai_live_dashboard.html"), "text/html");
  }

  if (url === "/api/experiments") {
    return serveFile(res, DATA_PATH, "application/json");
  }

  if (url.startsWith("/frontend/")) {
    const filePath = path.join(ROOT, url);
    const ext = path.extname(filePath).toLowerCase();

    const typeMap = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "application/javascript",
      ".json": "application/json"
    };

    return serveFile(res, filePath, typeMap[ext] || "text/plain");
  }

  send(res, 404, "text/plain", "BioDockLab route not found");
});

server.listen(PORT, () => {
  console.log(`BioDockLab Node server running at http://127.0.0.1:${PORT}`);
  console.log(`API: http://127.0.0.1:${PORT}/api/experiments`);
});