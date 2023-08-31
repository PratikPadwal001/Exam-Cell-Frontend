import React, { useState } from "react";

const ResultComponent = ({ student, results, onUpdateScores, exam_id }) => {
    const [editedResults, setEditedResults] = useState(results);

    const handleScoreChange = (index, event) => {
        const newResults = [...editedResults];
        newResults[index].score = parseInt(event.target.value);
        setEditedResults(newResults);
    };

    const handleSaveScores = () => {
        onUpdateScores(student, editedResults, exam_id);
    };

    return (
        <div>
            <h2>Student {student} Results</h2>
            <table>
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Correct Option</th>
                        <th>Marks</th>
                        <th>Student Answer</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {editedResults.map((result, index) => (
                        <tr key={index}>
                            <td>{result.question}</td>
                            <td>{result.correct_option}</td>
                            <td>{result.marks}</td>
                            <td>{result.student_answer}</td>
                            <td>
                                <input
                                    type="number"
                                    value={result.score}
                                    onChange={(event) =>
                                        handleScoreChange(index, event)
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleSaveScores}>Save Scores</button>
        </div>
    );
};

export default ResultComponent;
