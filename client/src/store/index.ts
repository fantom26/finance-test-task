import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "./socket/socket.middleware";

import SocketSlice from "./socket/socket.slice";

const RootReducer = combineReducers({
  socket: SocketSlice,
});

export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([socketMiddleware]);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
