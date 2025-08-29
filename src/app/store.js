import { configureStore } from "@reduxjs/toolkit";
import userReduce from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReduce,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 🔥 to‘g‘ri joy
    }),
});
