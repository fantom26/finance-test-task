import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITicker, ITickerApi } from "utils/declarations";

interface Coordinates {
  x: string[];
  y: number[];
}

export interface ChatState {
  tickers: ITicker[];
  tickerNames: string[];
  selectedTickerNames: string[];
  tickerForChart: string;
  pricesOfTicker: Record<string, Coordinates>;
  isEstablishingConnection: boolean;
  isConnected: boolean;
}

const initialState: ChatState = {
  tickers: [],
  tickerNames: [],
  selectedTickerNames: [],
  tickerForChart: "",
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
    endConnecting: (state) => {
      state.isEstablishingConnection = false;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    },
    connectionDestroyed: (state) => {
      state.isConnected = false;
      state.isEstablishingConnection = false;
    },
    setSelectedTickerNames: (state, action) => {
      state.selectedTickerNames = action.payload;
    },
    selectTickerForChart: (state, action) => {
      state.tickerForChart = action.payload;
    },
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
        state.tickerNames = action.payload.tickers.map(
          (ticker) => ticker.ticker
        );
      }

      action.payload.tickers.forEach((item) => {
        if (state.pricesOfTicker.hasOwnProperty(item.ticker)) {
          state.pricesOfTicker[item.ticker]?.y.push(+item.price);
          state.pricesOfTicker[item.ticker]?.x.push(item.last_trade_time);
        } else {
          state.pricesOfTicker[item.ticker] = {
            x: [item.last_trade_time],
            y: [+item.price],
          };
        }
      });
    },
  },
});

export const socketActions = { ...socketSlice.actions };

export default socketSlice.reducer;
