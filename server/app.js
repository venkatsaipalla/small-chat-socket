const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

// Use CORS middleware
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(4000, () => {
  console.log("server running at http://localhost:4000");
});
