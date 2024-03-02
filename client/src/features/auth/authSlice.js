import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// <!-- auth slice -->
const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    user: {},
    users: [],
    token: Cookies.get('accessToken') || null,
    projects: [],
    tasks: []
  },
  reducers: {
    setUserData: (state, action) => {
      state.user = action?.payload?.user || state.user;
      state.token = action.payload?.token || state.token;
      state.projects = action.payload?.projects || state.projects;
      state.tasks = action.payload?.tasks || state.tasks;
    },

    addNewData: (state, action) => {
      state.projects = action.payload?.projects ? [...state.projects, action.payload?.projects] : state.projects;
      state.tasks = action.payload?.task ? [...state.tasks, action.payload?.task] : state.tasks;
    },
    removeUserData: (state) => {
      state.user = {};
      state.users = [];
      state.posts = [];
      state.token = null;
    }
  }
});

// <!-- export selector -->
export const getAllAuthData = (state) => state.userState;

// <!-- export actions -->
export const { setUserData, removeUserData, addNewData } = authSlice.actions;

// <!-- export reducer -->
export default authSlice.reducer;
