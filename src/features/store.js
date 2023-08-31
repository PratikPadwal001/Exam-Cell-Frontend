import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./student/studentSlice";
import authReducer from "./auth/authSlice";
import instructorReducer from "./instructor/instructorSlice";
import adminReducer from "./admin/adminSlice";

const store = configureStore({
    reducer: {
        student: studentReducer,
        auth: authReducer,
        instructor: instructorReducer,
        admin: adminReducer,
    },
});

export default store;
