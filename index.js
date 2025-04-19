const express = require("express");
const socketio = require("socket.io");

const app = express();

app.get("/", (req, res) => {
  res.send("Hi from Codedamn");
});

const server = app.listen(1337, () => {
  console.log("Server running!");
});

const io = socketio(server);

io.on(
  "connection",
  (socket) => {
    socket.on("disconnect", () => {
      console.error("Socket disconnected");
      throw new Error("Socket is not connected");
    });
  },
  (error) => {
    console.log(error);
  }
);
