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
        socket.emit("get-tickers");
        store.dispatch(socketActions.connectionEstablished());
      });

      socket.on("ticker", setTickers);
    }

    // if (socketActions.deleteTicker.match(action)) {
    //   socket.emit("delete-ticker");
    // }

    // if (socketActions.addTicker.match(action)) {
    //   socket.emit("add-ticker");
    // }

    next(action);
  };
};
