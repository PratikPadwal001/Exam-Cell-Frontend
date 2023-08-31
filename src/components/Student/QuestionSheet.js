import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../api/api";
import { fetchAnswers } from "../../features/student/studentSlice";

export default function QuestionSheet() {
    const { examId } = useParams();
    const { exams } = useSelector((state) => state.student);
    const questions = exams.find((item) => item.id === parseInt(examId));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const retrievedJsonString = sessionStorage.getItem("user");
    const user = JSON.parse(retrievedJsonString);

    const [answers, setAnswers] = useState(
        new Array(questions.question_set.length).fill(null)
    );

    const handleAnswerChange = (questionIndex, selectedOption) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = selectedOption;
        setAnswers(updatedAnswers);
    };

    const handleSubmit = () => {
        const ansData = {
            user_id: user.id,
            exam_id: examId,
            answers,
        };
        axios.post(`${BASE_URL}/student/submit-answer-sheet`, ansData);
        dispatch(fetchAnswers(user.id));
        navigate(`/dashboard/${user.role}`);
    };

    return (
        <div>
            <div>QuestionSheet</div>
            <div>{questions.name}</div>
            <div>
                {questions.question_set.map((item, index) => (
                    <div key={index}>
                        <div>{item.question}</div>
                        <ul>
                            {item.options.map((op, optionIndex) => (
                                <li key={optionIndex}>
                                    <input
                                        type="radio"
                                        name={`question_${index}`}
                                        value={op}
                                        checked={answers[index] === op}
                                        onChange={() =>
                                            handleAnswerChange(index, op)
                                        }
                                    />
                                    {op}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit}>Submit Answers</button>
        </div>
    );
}
