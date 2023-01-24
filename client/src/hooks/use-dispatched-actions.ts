import { bindActionCreators } from "@reduxjs/toolkit";
import { StoreActions } from "store/actions";

import { useAppDispatch } from "./use-store";

export const useDispatchedActions = () => {
  const dispatch = useAppDispatch();

  return bindActionCreators(StoreActions, dispatch);
};
