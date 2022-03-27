const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://courshare-app.vercel.app"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 8888;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("alert", (txt, uid, name, id) => {
    io.emit("change", socket.id, txt, uid, name, id);
  });

  socket.on("join", (uid, name, id) => {
    io.emit("joined", socket.id, uid, name, id);
    console.log("join");
  });

  socket.on("typing", (uid, name, id) => {
    io.emit("typing", socket.id, uid, name, id);
    console.log("typing");
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
