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
    projects: [],
    DisplayProject: {
      htmlCode: "",
      cssCode: "",
      jsCode: "",
      output: "",
      title: "New project",
      projectId: -1
    }
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
      state.isLoggedIn = false;
      state.email = "";
      state.displayName = "";
      state.profilePicUrl = "";
      state.id = "";
    },
    EditProject: ( state, action ) => {
      state.DisplayProject.htmlCode = action.payload.htmlCode;
      state.DisplayProject.cssCode = action.payload.cssCode;
      state.DisplayProject.jsCode = action.payload.jsCode;
      state.DisplayProject.output = action.payload.output;
      state.DisplayProject.title = action.payload.title;
      state.DisplayProject.projectId = action.payload.projectId;
    },
    clearWorkspace: ( state ) => {
      state.DisplayProject.htmlCode = "";
      state.DisplayProject.cssCode = "";
      state.DisplayProject.jsCode = "";
      state.DisplayProject.output = "";
      state.DisplayProject.title = "New project";
      state.DisplayProject.projectId = -1;
    }
  }
});

export default userSlice.reducer;
export const { loginUser, signoutUser, EditProject, clearWorkspace } = userSlice.actions;
