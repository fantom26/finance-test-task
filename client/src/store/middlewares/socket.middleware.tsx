import { Middleware } from "redux";
import { Socket, io } from "socket.io-client";
import { StoreActions } from "store/actions";
import { REACT_APP_API_URL } from "utils/constants";
import { ITickerApi } from "utils/declarations";

export const socketMiddleware: Middleware = (store) => {
  let socket: Socket;

  return (next) => (action) => {
    socket = io(`${REACT_APP_API_URL}`);

    const setTickers = (tickers: ITickerApi[]) => {
      store.dispatch(StoreActions.receiveAllTickers({ tickers }));
      store.dispatch(StoreActions.receiveTickersNames({ tickers }));
      store.dispatch(StoreActions.receivePiecesOfTickers({ tickers }));
    };

    if (StoreActions.startConnecting.match(action)) {
      socket.on("connect", () => {
        store.dispatch(StoreActions.connectionEstablished());
      });

      socket.emit("start");

      socket.on("ticker", setTickers);

      socket.io.on("reconnect_error", () => {
        // eslint-disable-next-line no-console
        console.log("Server connection error. Server is not available!");

        socket.disconnect();
      });
    }

    next(action);
  };
};
