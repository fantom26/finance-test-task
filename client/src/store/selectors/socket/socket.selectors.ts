import { RootState } from "store";
import { initialSocketState } from "store/slices";

export const getSocketInfo = (state: RootState) => state?.socket || initialSocketState;
