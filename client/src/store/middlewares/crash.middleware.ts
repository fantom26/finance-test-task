import { Middleware } from "redux";

export const crashMiddleware: Middleware = (store) => (next) => (action) => {
  console.log("crashMiddleware");
  try {
    return next(action);
  } catch (error) {
    console.error("Caught an exception!", error);
    throw error;
  }
};
