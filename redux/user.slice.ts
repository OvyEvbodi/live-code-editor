import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: "",
    firstName: "",
    lastName: "",
    profileUrl: "",
    isLoggedIn: false,
    projects: {},
    id: 0
  },
  reducers: {
    loginUser: ( state, action ) => {
      state.isLoggedIn = true;
      state.email = action.payload;
    },
    signoutUser: ( state ) => {
      state.isLoggedIn = false;
      state.email = "";
    },
  }
});

export default userSlice.reducer;
export const { loginUser, signoutUser } = userSlice.actions;
