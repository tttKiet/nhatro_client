import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userSlice } from "../reducers";

const persistConfig = {
  key: "user",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { persistor };

export default store;
