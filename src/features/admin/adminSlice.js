import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../api/api";

const initialState = {
    scores: [],
    users: [],
};

export const fetchScores = createAsyncThunk("admin/fetchScores", async () => {
    try {
        const response = await axios.get(`${BASE_URL}/instructor/all-answers`);

        return response.data;
    } catch (error) {
        throw error;
    }
});

export const fetchUsers = createAsyncThunk("admin/fetchAnswers", async () => {
    try {
        const response = await axios.get(`${BASE_URL}/admin/get-all-users`);

        return response.data;
    } catch (error) {
        throw error;
    }
});

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchScores.fulfilled, (state, action) => {
            state.scores = action.payload;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        });
    },
});

export default adminSlice.reducer;
