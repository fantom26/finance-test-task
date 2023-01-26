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
      // if (store.getState().socket.isConnected) {
      // }

      socket.io.on("reconnect_error", (error) => {
        console.log("Server connection error. Server is not available!");

        socket.disconnect();
      });
    }

    if (socketActions.endConnecting.match(action)) {
      // socket.off("connect");
      // socket.off("ticker", setTickers);
      // socket.disconnect();
      socket.removeAllListeners();

      console.log("Ты сможешь! 4");
      // socket.on("disconnect", () => {
      //   console.log(socket.id); // undefined
      // });
      // socket.on("disconnect", () => {
      //   console.log("Ты сможешь! 3");
      //   socket.off("ticker", setTickers);
      //   socket.off("connect");
      // });

      store.dispatch(socketActions.connectionDestroyed());
    }

    next(action);
  };
};
