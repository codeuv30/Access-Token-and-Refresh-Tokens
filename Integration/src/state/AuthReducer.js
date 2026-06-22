import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isUserFetched: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setIsUserFetched: (state, action) => {
            state.isUserFetched = action.payload;
        },
    }
})

export const { setUser, setIsUserFetched } = authSlice.actions;