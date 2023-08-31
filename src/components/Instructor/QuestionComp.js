import React, { useState } from "react";

const QuestionComponent = ({ question_number, onQuestionSubmit }) => {
    const [questionText, setQuestionText] = useState("");
    const [options, setOptions] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [marks, setMarks] = useState(0);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const questionData = {
            question_number: question_number,
            question: questionText,
            options: options.split(","),
            correct_option: correctAnswer,
            marks: parseInt(marks),
        };

        onQuestionSubmit(questionData);
    };

    return (
        <div>
            <h2>Question {question_number}</h2>
            <div>
                <div>
                    <label>Question Text:</label>
                    <input
                        type="text"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Options:</label>
                    <input
                        type="text"
                        value={options}
                        onChange={(e) => setOptions(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Correct Answer:</label>
                    <input
                        type="text"
                        value={correctAnswer}
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Marks:</label>
                    <input
                        type="number"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                        required
                    />
                </div>
                <button onClick={handleFormSubmit}>Add</button>
            </div>
        </div>
    );
};

export default QuestionComponent;
