import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../api/api";

const initialState = {
    answers: [],
    exams: [],
};

export const fetchAnswersAndExams = createAsyncThunk(
    "instructor/fetchAnswersAndExams",
    async () => {
        try {
            const answersResponse = await axios.get(
                `${BASE_URL}/instructor/all-answers`
            );
            const examsResponse = await axios.get(
                `${BASE_URL}/instructor/all-exams`
            );

            return {
                answers: answersResponse.data,
                exams: examsResponse.data,
            };
        } catch (error) {
            throw error;
        }
    }
);

const instructorSlice = createSlice({
    name: "instructor",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAnswersAndExams.fulfilled, (state, action) => {
            state.loading = false;
            state.answers = action.payload.answers;
            state.exams = action.payload.exams;
        });
    },
});

export default instructorSlice.reducer;
