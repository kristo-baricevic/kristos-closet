import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export default userSlice.reducer;

