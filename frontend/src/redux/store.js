import { configureStore } from "@reduxjs/toolkit";
import taskAPI from "./features/api/taskAPI";

const store = configureStore({
  reducer: {
    [taskAPI.reducerPath]: taskAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskAPI.middleware),
});

export default store;
