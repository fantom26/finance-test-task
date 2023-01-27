import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { socketMiddleware } from "./middlewares/socket.middleware";
import { socketSlice, tickerSlice } from "./slices";

const RootReducer = combineReducers({
  socket: socketSlice.reducer,
  ticker: tickerSlice.reducer
});

export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([socketMiddleware])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
