import React, { createContext, useContext } from "react";
import SocketIOClient from "socket.io-client";
const APIENDPOINT = "http://localhost:4000";

const socket = SocketIOClient(APIENDPOINT, {
  autoConnect: false, // Disabling autoconnect, will activate it at login or after selecting an user Id
  auth: {
    token: localStorage.getItem("id"), // using user id as a token
  },
});
const SocketContext = createContext(socket);

const SocketContextProvider = ({ children }: any) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

const useSocketContext = () => {
  return useContext(SocketContext);
};

export { SocketContextProvider, useSocketContext };
