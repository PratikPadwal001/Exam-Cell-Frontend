import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../api/api";

export const fetchExams = createAsyncThunk(
    "student/fetchExams",
    async (user_id) => {
        const response = await axios.get(
            `${BASE_URL}/student/get-exams/${user_id}`
        );
        return response.data;
    }
);

export const fetchAnswers = createAsyncThunk(
    "student/fetchAnswers",
    async (user_id) => {
        const response = await axios.get(
            `${BASE_URL}/student/get-answer-sheets/${user_id}`
        );
        return response.data;
    }
);

const studentSlice = createSlice({
    name: "student",
    initialState: {
        exams: [],
        answers: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchExams.fulfilled, (state, action) => {
            state.exams = action.payload;
        });
        builder.addCase(fetchAnswers.fulfilled, (state, action) => {
            state.answers = action.payload;
        });
    },
});

export default studentSlice.reducer;
