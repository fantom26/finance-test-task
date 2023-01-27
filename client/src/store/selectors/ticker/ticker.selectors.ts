import { RootState } from "store";
import { initialTickerState } from "store/slices";

export const getTickerInfo = (state: RootState) => state?.ticker || initialTickerState;
