import { Middleware } from "redux";
import { io, Socket } from "socket.io-client";
import { socketActions } from "./socket.slice";
import { ITicker } from "utils/declarations";

export const socketMiddleware: Middleware = (store) => {
  let socket: Socket;

  return (next) => (action) => {
    if (socketActions.startConnecting.match(action)) {
      socket = io(`${process.env.REACT_APP_API_URL}`);
      socket.on("connect", () => {
        socket.emit("start");
        store.dispatch(socketActions.connectionEstablished());
      });

      socket.on("ticker", (response) => {
        const tickers: ITicker[] = Array.isArray(response)
          ? response
          : [response];
        store.dispatch(socketActions.receiveAllTickers({ tickers }));
      });
    }

    next(action);
  };
};
