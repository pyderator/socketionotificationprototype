const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const PostsController = require("./Controller/post.controller");
const Posts = require("./Model/posts");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = http.createServer(app);

app.use(
  cors({
    allowedHeaders: "*",
    origin: "*",
  })
);
app.use("/api", PostsController);
app.get("/", (req, res) => res.status(200).json({ message: "API is working" }));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
    allowedHeaders: "*",
    credentials: "true",
  },
});

const tokenMiddleWare = (socket, next) => {
  console.log(socket.handshake);
  const { token } = socket.handshake.auth;
  console.log("the token is", token);
  // Verify if the token is valid and then connect the user
  if (token) {
    console.log("verified");
    next();
  }
};
io.use(tokenMiddleWare);
io.on("connection", (socket) => {
  console.log(typeof socket.handshake.auth.token);
  console.log(socket.handshake.auth.token);
  socket.join(socket.handshake.auth.token);
  socket.on("trigger post", ({ postId, message }) => {
    const posts = new Posts();
    const currentPost = posts.fetchPost(postId);
    console.log("current post", currentPost);
    console.log("socket rooms", socket.rooms);
    socket
      .to(currentPost.userId)
      .to(socket.handshake.auth.token)
      .emit("Notification", currentPost);
  });
});

server.listen(4000, () =>
  console.log(
    "Server is up and running on port 4000. Link: http://localhost:4000"
  )
);
