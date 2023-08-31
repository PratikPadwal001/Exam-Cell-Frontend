import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExams, fetchAnswers } from "../../features/student/studentSlice";
import { Link } from "react-router-dom";
import "./ViewExam.css";

const dateTimeDisplay = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} | ${hours}:${minutes}`;
};

export default function ViewExams() {
    const dispatch = useDispatch();
    const { exams, answers } = useSelector((state) => state.student);

    const retrievedJsonString = sessionStorage.getItem("user");
    const user = JSON.parse(retrievedJsonString);

    const examAnswers = (examId) => {
        return answers.some((item) => item.exam_id === parseInt(examId));
    };

    const examScores = (examId) => {
        const data = answers.find((item) => item.exam_id === parseInt(examId));
        const scoreCheck = !data || !data.scores ? true : false;
        return scoreCheck;
    };

    useEffect(() => {
        dispatch(fetchExams(user.id));
        dispatch(fetchAnswers(user.id));
    }, [dispatch, user.id]);

    const getCurrentTime = () => new Date().getTime();

    const getExamStatus = (exam) => {
        const currentTime = getCurrentTime();
        const startTime = new Date(exam.start_time).getTime();
        const endTime = new Date(exam.end_time).getTime();

        if (currentTime >= startTime && currentTime <= endTime) {
            return "Going On";
        } else if (currentTime < startTime) {
            return "Yet To Start";
        } else {
            return "Expired";
        }
    };

    function ExamLink(exam) {
        const examStatus = getExamStatus(exam);
        if (examScores(exam.id)) {
            return <div>Unchecked</div>;
        } else if (examAnswers(exam.id)) {
            return <Link to={`/answer-sheet/${exam.id}`}>See Test</Link>;
        } else if (examStatus === "Going On") {
            return <Link to={`/question-sheet/${exam.id}`}>Give Test</Link>;
        } else {
            return <div>{examStatus}</div>;
        }
    }

    return (
        <div>
            <ul>
                {exams.map((exam) => (
                    <li key={exam.id}>
                        <div style={{ border: "2px solid black" }}>
                            <div>{exam.name}</div>
                            <div>{exam.description}</div>
                            <div>Marks: {exam.total_marks}</div>
                            <div>
                                {`Start Date: ${dateTimeDisplay(
                                    exam.start_time
                                )}`}
                            </div>
                            <div>
                                {`End Date: ${dateTimeDisplay(exam.end_time)}`}
                            </div>
                            <div>{ExamLink(exam)}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
