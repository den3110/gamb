import dashboardSlice from "@/redux/dashboardSlice";
import userSlice from "@/redux/userSlice";
import appSlice from "@/redux/appSlice";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: [],
  blacklist: ["_persist"],
};

const configPersistDashboard = {
  key: "dashboard",
  storage,
  whitelist: ["selectedDashboardMenuKeys", "selectedDashboardOpenMenuKeys"],
  blacklist: ["_persist"],
};

const configPersistUser = {
  key: "user",
  storage,
  whitelist: ["userInfo"],
  blacklist: ["_persist"],
};

const configPersistApp = {
  key: "app",
  storage,
  whitelist: ["mode", "lang"],
  blacklist: ["_persist"],
};

const rootReducer = combineReducers({
  dashboard: persistReducer(configPersistDashboard, dashboardSlice),
  user: persistReducer(configPersistUser, userSlice),
  app: persistReducer(configPersistApp, appSlice),
});

const persistRootReducer = persistReducer(rootPersistConfig, rootReducer);

export function makeStore() {
  return configureStore({
    reducer: persistRootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
}

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;

export const persistor = persistStore(store);
export const useAppDispatch = () => useDispatch<AppDispatch>();
