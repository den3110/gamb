import { DASHBOARD_MENU_TYPE } from "@/constance/dashboardMenu";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DashBoardMenu {
  selectedDashboardMenuKeys: string[];
  selectedDashboardOpenMenuKeys: string[];
  isCollapsedDashboardMenu: boolean;
}

const initialState: DashBoardMenu = {
  selectedDashboardMenuKeys: [
    DASHBOARD_MENU_TYPE.MEMBER_INFORMATION.MEMBER_LIST,
  ],
  selectedDashboardOpenMenuKeys: [DASHBOARD_MENU_TYPE.MEMBER_INFORMATION.type],
  isCollapsedDashboardMenu: false,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setSelectedDashboardMenuKeys: (state, action: PayloadAction<string[]>) => {
      state.selectedDashboardMenuKeys = action.payload;
    },
    setSelectedDashboardOpenMenuKeys: (
      state,
      action: PayloadAction<string[]>
    ) => {
      state.selectedDashboardOpenMenuKeys = action.payload;
    },
    setIsCollapsedDashboardMenu: (state, action: PayloadAction<boolean>) => {
      state.isCollapsedDashboardMenu = action.payload;
    },
  },
});

export const {
  setSelectedDashboardMenuKeys,
  setSelectedDashboardOpenMenuKeys,
  setIsCollapsedDashboardMenu,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
