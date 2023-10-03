import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isLogin: false,
  responses: [],
  isAdmin: false,
  chats: {
    history: null,
    question: null,
    answer: null,
  },
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    isLoggedIn: (state, action) => {
      state.token = action.payload.jwt;
      state.isLogin = true;
      state.isAdmin = action.payload.is_admin;
    },

    setHistory: (state, action) => {
      state.chats.history = action.payload;
    },
    removeHistory: (state, action) => {
      state.chats.history = null;
    },
    removeChat: (state, action) => {
      state.responses.length = 0;
    },
    setResponse: (state, action) => {
      state.responses.push(action.payload);
    },
    logOut: (state, action) => {
      state.isLogin = false;
      state.isAdmin = false;
      state.token = null;
    },
  },
});

export const {
  isLoggedIn,
  setHistory,
  removeChat,
  removeHistory,
  setResponse,
  logOut,
} = chatSlice.actions;

export default chatSlice.reducer;
