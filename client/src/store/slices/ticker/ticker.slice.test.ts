import { fakeTickers, tickers } from "tests/fake-data";
import { ICoordinates } from "utils/declarations";

import { initialTickerState, tickerActions, tickerSlice } from "./ticker.slice";

describe("Test reducers of ticker slice", () => {
  test("Pass 1 ticker into setSelectedTickerNames reducer", () => {
    expect(tickerSlice.reducer(initialTickerState, tickerActions.setSelectedTickerNames(["AAPL"]))).toEqual({
      ...initialTickerState,
      selectedTickerNames: ["AAPL"]
    });
  });

  test("Pass several tickers into setSelectedTickerNames reducer", () => {
    expect(tickerSlice.reducer(initialTickerState, tickerActions.setSelectedTickerNames(tickers))).toEqual({
      ...initialTickerState,
      selectedTickerNames: tickers
    });
  });

  test("selectTickerForChart reducer", () => {
    expect(tickerSlice.reducer(initialTickerState, tickerActions.selectTickerForChart("AAPL"))).toEqual({
      ...initialTickerState,
      tickerForChart: "AAPL"
    });
  });

  test("receiveTickersNames reducer", () => {
    expect(tickerSlice.reducer(initialTickerState, tickerActions.receiveTickersNames({ tickers: fakeTickers }))).toEqual({
      ...initialTickerState,
      tickerNames: fakeTickers.map((ticker) => ticker.ticker)
    });
  });

  test("First running of receivePiecesOfTickers reducer", () => {
    expect(tickerSlice.reducer(initialTickerState, tickerActions.receivePiecesOfTickers({ tickers: fakeTickers }))).toEqual({
      ...initialTickerState,
      pricesOfTicker: fakeTickers.reduce((accum, fakeTicker) => {
        accum[fakeTicker.ticker] = {
          x: [fakeTicker.last_trade_time],
          y: [fakeTicker.price]
        };

        return accum;
      }, {} as Record<string, ICoordinates>)
    });
  });

});
