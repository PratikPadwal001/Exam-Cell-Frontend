import React, { useState } from "react";
import QuestionFormMultipleTimes from "./QuestionFormMultipleTimes";
import { BASE_URL } from "../../api/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExamForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [start_time, setStartTime] = useState("");
    const [end_time, setEndTime] = useState("");
    const [students_enlisted, setStudentsEnlisted] = useState("");
    const [questions, setQuestions] = useState([]);
    const [total_marks, setTotalMarks] = useState(0);
    const [instructor_id, setInstructorId] = useState(0);

    const retrievedJsonString = sessionStorage.getItem("user");
    const user = JSON.parse(retrievedJsonString);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            name,
            description,
            start_time,
            end_time,
            students_enlisted: students_enlisted
                .split(",")
                .map((student) => parseInt(student)),
            question_set: questions.map(
                ({ question_number, marks, ...rest }) => ({
                    marks: parseInt(marks),
                    ...rest,
                })
            ),
            total_marks,
            instructor_id,
        };
        console.log(formData);
        axios
            .post(`${BASE_URL}/instructor/create-exam`, formData)
            .then((response) => {
                console.log("Exam created successfully!", response.data);
            })
            .catch((error) => {
                console.error("Error creating exam:", error);
            });
        navigate(`/dashboard/${user.role}`);
    };

    const handleQuestionSubmit = (questionData) => {
        // Add the submitted question data to the list of questions
        const indexToUpdate = questions.findIndex(
            (obj) => obj.question_number === questionData.question_number
        );

        if (indexToUpdate !== -1) {
            // If the object already exists, update it
            const updatedArray = [...questions];
            updatedArray[indexToUpdate] = {
                ...updatedArray[indexToUpdate],
                ...questionData,
            };
            setQuestions(updatedArray);
        } else {
            // If the object doesn't exist, add it
            setQuestions([...questions, questionData]);
        }
    };

    return (
        <div>
            <h1>Create Course</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Start Time:
                    <input
                        type="datetime-local"
                        value={start_time}
                        onChange={(event) => setStartTime(event.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    End Time:
                    <input
                        type="datetime-local"
                        value={end_time}
                        onChange={(event) => setEndTime(event.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Students Enlisted:
                    <input
                        type="text"
                        value={students_enlisted}
                        onChange={(event) =>
                            setStudentsEnlisted(event.target.value)
                        }
                        required
                    />
                </label>
                <br />
                <label>
                    Question Set:
                    <QuestionFormMultipleTimes
                        n={2}
                        handleQuestionSubmit={handleQuestionSubmit}
                    />
                </label>
                <br />
                <label>
                    Total Marks:
                    <input
                        type="number"
                        value={total_marks}
                        onChange={(event) => setTotalMarks(event.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Instructor ID:
                    <input
                        type="number"
                        value={instructor_id}
                        onChange={(event) =>
                            setInstructorId(event.target.value)
                        }
                        required
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ExamForm;
