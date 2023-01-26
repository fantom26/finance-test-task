import { Middleware } from "redux";
import { io, Socket } from "socket.io-client";
import { socketActions } from "./socket.slice";
import { ITickerApi } from "utils/declarations";
import { REACT_APP_API_URL } from "utils/constants";

export const socketMiddleware: Middleware = (store) => {
  let socket: Socket;

  return (next) => (action) => {
    socket = io(`${REACT_APP_API_URL}`);

    const setTickers = (tickers: ITickerApi[]) => {
      store.dispatch(socketActions.receiveAllTickers({ tickers }));
    };

    if (socketActions.startConnecting.match(action)) {
      socket.on("connect", () => {
        socket.emit("start");

        store.dispatch(socketActions.connectionEstablished());
      });

      console.log("isConnected", store.getState().socket.isConnected);
      if (store.getState().socket.isConnected) {
        socket.on("ticker", setTickers);
      }

      socket.io.on("reconnect_error", (error) => {
        console.log("Server connection error. Server is not available!");

        socket.disconnect();
      });
    }

    if (socketActions.endConnecting.match(action)) {
      // socket.off("connect");
      store.dispatch(socketActions.connectionDestroyed());
      socket.off("ticker", setTickers);
      // socket.disconnect();
    }

    next(action);
  };
};
