import { Middleware } from "redux";
import { Socket, io } from "socket.io-client";
import { REACT_APP_API_URL } from "utils/constants";
import { ITickerApi } from "utils/declarations";

import { socketActions } from "./socket.slice";

export const socketMiddleware: Middleware = (store) => {
  let socket: Socket;

  return (next) => (action) => {
    socket = io(`${REACT_APP_API_URL}`);

    const setTickers = (tickers: ITickerApi[]) => {
      console.log("Ты сможешь! 1");
      store.dispatch(socketActions.receiveAllTickers({ tickers }));
    };

    if (socketActions.startConnecting.match(action)) {
      socket.on("connect", () => {
        socket.emit("start");
        socket.on("ticker", setTickers);
        console.log("Ты сможешь! 2");
        store.dispatch(socketActions.connectionEstablished());
      });

      console.log("isConnected", store.getState().socket.isConnected);

      socket.io.on("reconnect_error", () => {
        console.log("Server connection error. Server is not available!");

        socket.disconnect();
      });
    }

    if (socketActions.endConnecting.match(action)) {
      socket.removeAllListeners();

      console.log("Ты сможешь! 4");
      store.dispatch(socketActions.connectionDestroyed());
    }

    next(action);
  };
};
