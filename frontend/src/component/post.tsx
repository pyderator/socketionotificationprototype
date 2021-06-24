import React, { useEffect, useState } from "react";

export const Post = () => {
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
  console.log(posts);
  return (
    <div>
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
