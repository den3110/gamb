import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface App {
  mode: "dark" | "light";
  lang: {
    countryCode: string;
    lng: string;
  };
  isShowNotifiCation: boolean;
}

const initialState: App = {
  mode: "light",
  lang: {
    countryCode: "GB",
    lng: "en",
  },
  isShowNotifiCation: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<App["mode"]>) => {
      state.mode = action.payload;
    },
    setLang: (state, action: PayloadAction<App["lang"]>) => {
      state.lang = action.payload;
    },
    setIsShowNotifiCation: (state, action: PayloadAction<boolean>) => {
      state.isShowNotifiCation = action.payload;
    },
  },
});

export const { setMode, setLang, setIsShowNotifiCation } = appSlice.actions;

export default appSlice.reducer;
