import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICoordinates, ITicker, ITickerApi } from "utils/declarations";

export interface TickerState {
  tickers: ITicker[];
  tickerNames: string[];
  selectedTickerNames: string[];
  tickerForChart: string;
  pricesOfTicker: Record<string, ICoordinates>;
}

export const initialTickerState: TickerState = {
  tickers: [],
  tickerNames: [],
  selectedTickerNames: [],
  tickerForChart: "",
  pricesOfTicker: {}
};

export const tickerSlice = createSlice({
  name: "ticker",
  initialState: initialTickerState,
  reducers: {
    setSelectedTickerNames: (state, action) => {
      state.selectedTickerNames = action.payload;
    },
    selectTickerForChart: (state, action) => {
      state.tickerForChart = action.payload;
    },
    receiveTickersNames: (
      state,
      action: PayloadAction<{
        tickers: ITickerApi[];
      }>
    ) => {
      if (state.tickerNames.join("") !== action.payload.tickers.map((ticker) => ticker.ticker).join("")) {
        state.tickerNames = action.payload.tickers.map((ticker) => ticker.ticker);
      }
    },
    receivePiecesOfTickers: (
      state,
      action: PayloadAction<{
        tickers: ITickerApi[];
      }>
    ) => {
      action.payload.tickers.forEach((item) => {
        if (state.pricesOfTicker.hasOwnProperty(item.ticker)) {
          state.pricesOfTicker[item.ticker]?.y.push(+item.price);
          state.pricesOfTicker[item.ticker]?.x.push(item.last_trade_time);
        } else {
          state.pricesOfTicker[item.ticker] = {
            x: [item.last_trade_time],
            y: [+item.price]
          };
        }
      });
    },
    receiveAllTickers: (
      state,
      action: PayloadAction<{
        tickers: ITickerApi[];
      }>
    ) => {
      state.tickers = action.payload.tickers.reduce((tickers: ITicker[], ticker) => {
        const oldTicker = state.tickers.find((item) => item.ticker === ticker.ticker) as ITicker;

        tickers.push({
          ...ticker,
          incremented: !oldTicker?.price ? true : ticker.price > oldTicker?.price,
          showned: !!oldTicker?.showned
        });

        return tickers;
      }, []);
    }
  }
});

export const tickerActions = { ...tickerSlice.actions };
