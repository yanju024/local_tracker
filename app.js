const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();

const PORT = 3000;

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

io.on("connection", function (socket) {
  console.log("New WebSocket connection");

  socket.on("send-location", (data) => {
    io.emit("recieve-location", { id: socket.id, ...data });
  });
  //disconnect
  socket.on("disconnect", () => {
    io.emit("user-disconnect", socket.id);
  });
});

app.get("/", (req, res) => {
  //res.send('Server is running!');
  res.render("index");
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
