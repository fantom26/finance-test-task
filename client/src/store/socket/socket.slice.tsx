import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITicker, ITickerApi } from "utils/declarations";

export interface ChatState {
  tickers: ITicker[];
  tickerNames: string[];
  selectedTickerNames: string[];
  pricesOfTicker: Record<string, number[]>;
  isEstablishingConnection: boolean;
  isConnected: boolean;
}

const initialState: ChatState = {
  tickers: [],
  tickerNames: [],
  selectedTickerNames: [],
  pricesOfTicker: {},
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
    setSelectedTickerNames: (state, action) => {
      state.selectedTickerNames = action.payload;
    },
    deleteTicker: (
      state,
      action: PayloadAction<{
        name: string;
      }>
    ) => {
      state.tickers = state.tickers.filter(
        (ticker) => ticker.ticker !== action.payload.name
      );
    },
    addTicker: () => {},
    receiveAllTickers: (
      state,
      action: PayloadAction<{
        tickers: ITickerApi[];
      }>
    ) => {
      state.tickers = action.payload.tickers.reduce(
        (tickers: ITicker[], ticker) => {
          const oldTicker = state.tickers.find(
            (item) => item.ticker === ticker.ticker
          ) as ITicker;

          tickers.push({
            ...ticker,
            incremented: !oldTicker?.price
              ? true
              : ticker.price > oldTicker?.price,
            showned: oldTicker?.showned ? true : false,
          });

          return tickers;
        },
        []
      );

      if (
        state.tickerNames.join("") !==
        action.payload.tickers.map((ticker) => ticker.ticker).join("")
      ) {
        console.log("here");
        state.tickerNames = action.payload.tickers.map(
          (ticker) => ticker.ticker
        );
      }

      action.payload.tickers.forEach((item) => {
        if (state.pricesOfTicker.hasOwnProperty(item.ticker)) {
          state.pricesOfTicker[item.ticker].push(+item.price);
        } else {
          state.pricesOfTicker[item.ticker] = [+item.price];
        }
      });
    },
  },
});

export const socketActions = { ...socketSlice.actions };

export default socketSlice.reducer;
