import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../api/api";

const initialState = {
    user: null,
    success: false,
};

export const login = createAsyncThunk("auth/login", async (credentials) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
    return response.data;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            const jsonString = JSON.stringify(action.payload.user);
            sessionStorage.setItem("user_id", jsonString);
            sessionStorage.setItem("success", action.payload.success);
            state.user = action.payload.user.id;
            state.success = action.payload.success;
        });
    },
});

export default authSlice.reducer;
