import React, { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext";

export const Post = () => {
  const [id, setId] = useState(1);
  const [postId, setPost] = useState(1);
  const socket = useSocketContext();
  const [posts, setPosts] = useState<any>({ loading: true, data: "" });
  useEffect(() => {
    fetch("http://localhost:4000/api/posts", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setPosts({ loading: false, data }));
  }, []);
  return (
    <div>
      <label htmlFor="">User Id</label>
      <input
        type="number"
        value={id}
        onChange={(e: any) => setId(e.target.value)}
      />
      <button
        onClick={() => {
          localStorage.setItem("id", JSON.stringify(id));
          socket.connect();
          socket.on("connect", () => {
            console.log("connected");
            // socket.join(`${JSON.stringify(id)}`, (data: any) =>
            //   console.log(data)
            // );
          });
          socket.on(`Notification`, (data: any) => console.log("a", data));
        }}
      >
        Choose Id
      </button>
      <br />
      <label htmlFor="">Trigger for post</label>
      <input
        type="number"
        value={postId}
        onChange={(e: any) => setPost(e.target.value)}
      />
      <button
        onClick={() => {
          socket.emit("trigger post", {
            postId,
            message: "Hello I have triggered your post",
          });
        }}
      >
        Choose Post
      </button>
      {posts.loading ? (
        <p>Loading</p>
      ) : (
        posts.data.posts.map((p: any, i: number) => {
          return (
            <div>
              <h1>Post ID: {p.id}</h1>
              <h1>{p.title}</h1>
              <hr />
            </div>
          );
        })
      )}
    </div>
  );
};
