import { io } from "socket.io-client";

const env = process.env.NODE_ENV;

const determineClientSideAddress = (env: string) => {
  if (env === "production") {
    return "https://tic-tac-toe-vs.herokuapp.com";
  } else {
    return "http://localhost:8080";
  }
};

export const socket = io(determineClientSideAddress(env));
