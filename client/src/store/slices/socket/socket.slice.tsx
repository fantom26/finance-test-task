import { createSlice } from "@reduxjs/toolkit";

export interface SocketState {
  isEstablishingConnection: boolean;
  isConnected: boolean;
}

export const initialSocketState: SocketState = {
  isEstablishingConnection: false,
  isConnected: false
};

export const socketSlice = createSlice({
  name: "socket",
  initialState: initialSocketState,
  reducers: {
    startConnecting: (state) => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    }
  }
});

export const socketActions = { ...socketSlice.actions };
