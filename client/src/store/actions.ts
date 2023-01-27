import { socketActions } from "./slices/socket/socket.slice";
import { tickerActions } from "./slices/ticker/ticker.slice";

export const StoreActions = {
  ...socketActions,
  ...tickerActions
};
