/* eslint-disable @typescript-eslint/ban-ts-comment */
import { initialSocketState, initialTickerState } from "store/slices";

import { getTickerInfo } from "./ticker.selectors";

describe("Test of getTickerInfo selector", () => {
  test("Work with empty state", () => {
    // @ts-ignore
    expect(getTickerInfo({})).toEqual(initialTickerState);
  });

  test("Work with filled state", () => {
    expect(
      getTickerInfo({
        socket: initialSocketState,
        ticker: initialTickerState
      })
    ).toEqual(initialTickerState);
  });
});
