import { iMemberInfo } from "@/interfaces/member";
import { getUserInfo } from "@/modules/dashboard/api/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface DashBoardMenu {
  userInfo: iMemberInfo;
}

const initialState: DashBoardMenu = {
  userInfo: {} as iMemberInfo,
};

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async () => {
    const userInfoEp = await getUserInfo();
    return userInfoEp?.data || ({} as any);
  }
);

export const dashboardSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload || ({} as any);
    });
  },
});

export const {} = dashboardSlice.actions;

export default dashboardSlice.reducer;
