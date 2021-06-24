import React from "react";
import "./App.css";
import { SocketContextProvider } from "./context/SocketContext";
import { Post } from "./component/post";

function App() {
  return (
    <SocketContextProvider>
      <div className="App">
        <Post />
      </div>
    </SocketContextProvider>
  );
}

export default App;
