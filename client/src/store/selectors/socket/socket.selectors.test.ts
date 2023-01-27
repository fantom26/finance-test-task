/* eslint-disable @typescript-eslint/ban-ts-comment */
import { initialSocketState, initialTickerState } from "store/slices";

import { getSocketInfo } from "./socket.selectors";

describe("Test of getSocketInfo selector", () => {
  test("Work with empty state", () => {
    // @ts-ignore
    expect(getSocketInfo({})).toEqual(initialSocketState);
  });

  test("Work with filled state", () => {
    expect(
      getSocketInfo({
        socket: initialSocketState,
        ticker: initialTickerState
      })
    ).toEqual(initialSocketState);
  });
});
