import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    name: "Admin User",
    email: "admin@gmail.com",
    phone: "",
    avatar: "A"
  },
  reducers: {
    updateProfile: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;