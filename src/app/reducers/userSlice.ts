import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {User} from "@/app/types"
import { userApi } from "../services/userApi";
import { RootState } from "../store";
import { fakeImage } from "@/components/profile";

interface InitialState {
    user: User | null;
    isAuthenticated: boolean;
    users: User[] | null;
    current: User | null;
    token?: string;
}

const initialState: InitialState  = {
    user: null,
    isAuthenticated: false,
    users: null,
    current: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
    resetUser: (state) => {
        state.user = null;
    }

  },
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
    })
    .addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.current = action.payload;
    } )
    .addMatcher(userApi.endpoints.getUserById.matchFulfilled, (state, action) => {
        state.user = action.payload;
    } )
  }
});

export const { logout, resetUser } = userSlice.actions;
export default userSlice.reducer;
export const getIsAuthenticated = (state: RootState) => state.userSliceReducer.isAuthenticated;
export const getCurrentUser = (state: RootState) => state.userSliceReducer.current;
export const getUser = (state: RootState) => state.userSliceReducer.user;