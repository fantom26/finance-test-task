import { initialSocketState, socketActions, socketSlice } from "./socket.slice";

describe("Test reducers of socket slice", () => {
  test("startConnecting", () => {
    expect(socketSlice.reducer(initialSocketState, socketActions.startConnecting())).toEqual({ isEstablishingConnection: true, isConnected: false });
  });

  test("connectionEstablished", () => {
    expect(socketSlice.reducer(initialSocketState, socketActions.connectionEstablished())).toEqual({ isEstablishingConnection: true, isConnected: true });
  });
});
