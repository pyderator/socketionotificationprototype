const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const PostsController = require("./Controller/post.controller");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
    allowedHeaders: "*",
    credentials: "true",
  },
});
app.use(
  cors({
    allowedHeaders: "*",
    origin: "*",
  })
);
app.use("/api", PostsController);
app.get("/", (req, res) => res.status(200).json({ message: "API is working" }));

io.on("connection", (socket) => {
  console.log(`User with id ${socket.id} has connected.`);
  socket.on("disconnect", (socket) => {
    console.log(`User with id ${socket.id} has disconnected.`);
  });
});

server.listen(4000, () =>
  console.log(
    "Server is up and running on port 4000. Link: http://localhost:4000"
  )
);
