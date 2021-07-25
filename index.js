const express = require("express");
const app = express();
const Socketio = require("socket.io");
const http = require("http");
const port = process.env.PORT || 5000;
// const axios = require('axios');
const fs = require("fs");
const path = require("path");
const routes = require("./router");
const server = http.createServer(app);
const cors = require("cors");
app.use(cors());
app.use(routes);
const io = Socketio(server);

io.on("connection", (socket) => {
  console.log("We have a new connection!!!");
  socket.on("join", (id, callback) => {
    console.log({ id });


    // const { error, user } = addUser({ id: socket.id, _id: id });

    // if (error) {
    //   return callback({ error });
    // }

    socket.emit("message", {
      user: "admin",
      text: `${id}, welcome to the room ${id}`,
    });
    // socket.broadcast
    //   .to(user.room)
    //   .emit("message", { user: "admin", text: `${user.name}, has joined!` });
    // socket.join(user.room);
    // io.to(user.room).emit("roomData", {
    //   room: user.name,
    //   users: getUsersInRoom(user.room),
    // });
    callback();
  });
  socket.on("sendMessage", (message, callback) => {
    console.log(socket.id);
    // const user = getUser(socket.id);
    // console.log({ user });
    // io.to(user.room).emit("message", { user: user.name, text: message });
    // io.to(user.room).emit("roomData", {
    //   room: user.name,
    //   users: getUsersInRoom(user.room),
    // });
    callback();
  });
  socket.on("disconnect", () => {
    // const user = removeUser(socket.id);
    // console.log({ user });
    // if (user) {
    //   io.to(user.room).emit("message", {
    //     user: "admin",
    //     text: `${user.name} has left.`,
    //   });
    // }
    console.log("User had left!!!");
  });
});
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
