import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Admin/Register";
import Login from "./components/Login";
import CreateExam from "./components/Instructor/CreateExamComp";
import ViewExams from "./components/Student/ViewExams";
import QuestionSheet from "./components/Student/QuestionSheet";
import Dashboard from "./components/Dashboard/Dashboard";
import AnswerSheet from "./components/Student/AnswerSheets";
import EvalAnsSheetComp from "./components/Instructor/EvalAnsSheetComp";
import ViewUsersData from "./components/Admin/ViewUsersData";
import GenerateScoreSheet from "./components/Admin/GenerateScoreSheet";
import Header from "./components/Header";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/create-exam" element={<CreateExam />} />
                    <Route path="/dashboard/:role" element={<Dashboard />} />
                    <Route path="/view-exams" element={<ViewExams />} />
                    <Route
                        path="/view-users-data"
                        element={<ViewUsersData />}
                    />
                    <Route
                        path="/generate-score-sheet"
                        element={<GenerateScoreSheet />}
                    />
                    <Route
                        path="/eval-ans-sheet"
                        element={<EvalAnsSheetComp />}
                    />
                    <Route
                        path="/question-sheet/:examId"
                        element={<QuestionSheet />}
                    />
                    <Route
                        path="/answer-sheet/:examId"
                        element={<AnswerSheet />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
