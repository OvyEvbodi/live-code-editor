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
    searchString: "",
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
    },
    setSearchString: ( state, action ) => {
      state.searchString = action.payload;
    },
    clearTab: ( state, action ) => {
      switch(action.payload) {
        case "htmlCode":
          state.DisplayProject.htmlCode = "";
          break;
        case "cssCode":
          state.DisplayProject.cssCode = "";
          break;
        case "jsCode": state.DisplayProject.jsCode = "";
      }
    },
    setCode: ( state, action ) => {
      switch(action.payload.code) {
        case "htmlCode":
          state.DisplayProject.htmlCode = action.payload.value;
          break;
        case "cssCode":
          state.DisplayProject.cssCode = action.payload.value;
          break;
        case "jsCode":
          state.DisplayProject.jsCode = action.payload.value;
      }
    }
  }
});

export default userSlice.reducer;
export const { loginUser, signoutUser, EditProject, clearWorkspace, setSearchString, clearTab, setCode } = userSlice.actions;
