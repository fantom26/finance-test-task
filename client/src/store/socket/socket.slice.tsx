import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITicker } from "utils/declarations";

export interface ChatState {
  tickers: ITicker[];
  isEstablishingConnection: boolean;
  isConnected: boolean;
}

const initialState: ChatState = {
  tickers: [],
  isEstablishingConnection: false,
  isConnected: false,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    startConnecting: (state) => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    },
    receiveAllTickers: (
      state,
      action: PayloadAction<{
        tickers: ITicker[];
      }>
    ) => {
      state.tickers = action.payload.tickers;
    },
  },
});

export const socketActions = socketSlice.actions;

export default socketSlice.reducer;
