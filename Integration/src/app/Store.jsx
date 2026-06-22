import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../state/AuthReducer";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
})

export default store