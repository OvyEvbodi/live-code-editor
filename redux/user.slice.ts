import { createSlice } from '@reduxjs/toolkit';

interface UserProps {
  id: string | null;
  email: string | null;
  displayName: string;
  profilePicUrl?: string | null;
}
interface UserActionProps {
  payload: UserProps;
  type: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: "",
    email: "",
    displayName: "",
    profilePicUrl: "",
    isLoggedIn: false,
    projects: {}
  },
  reducers: {
    loginUser: ( state, action ) => {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.profilePicUrl = action.payload.profilePicUrl;
      state.id = action.payload.id;
    },
    signoutUser: ( state ) => {
      console.log(state.displayName)
      state.isLoggedIn = false;
      state.email = "";
      state.displayName = "";
      state.profilePicUrl = "";
      state.id = "";
      console.log(state.displayName)
    },
  }
});

export default userSlice.reducer;
export const { loginUser, signoutUser } = userSlice.actions;
