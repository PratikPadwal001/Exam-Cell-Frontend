import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAnswersAndExams } from "../../features/instructor/instructorSlice";
import ResultComponent from "./ResultComponent";
import axios from "axios";
import { BASE_URL } from "../../api/api";

export default function EvalAnsSheetComp() {
    const dispatch = useDispatch();
    const { exams, answers } = useSelector((state) => state.instructor);

    useEffect(() => {
        dispatch(fetchAnswersAndExams());
    }, [dispatch]);

    const mergeArrays = (arr1, arr2) => {
        return arr1.map((item, index) => [item, arr2[index]]);
    };

    const results = {};

    const scoreBoard = (exam, enlisted_students, question_set) => {
        enlisted_students.forEach((student) => {
            const filteredData = answers.filter(
                (item) => item.user_id === student && item.exam_id === exam.id
            );

            if (filteredData.length > 0) {
                const studentResult = filteredData.map((answer) => {
                    const mergedArray = mergeArrays(
                        answer.answers,
                        answer.scores
                            ? answer.scores
                            : Array(answer.answers.length).fill(0)
                    );

                    return mergedArray.map(([studentAnswer, score], index) => ({
                        question: question_set[index].question,
                        correct_option: question_set[index].correct_option,
                        marks: question_set[index].marks,
                        student_answer: studentAnswer,
                        score: score,
                    }));
                });

                results[student] = studentResult.flat();
            }
        });

        return results;
    };

    const handleUpdateScores = async (student, updatedResults, exam_id) => {
        const newScores = updatedResults.map((x) => x.score);

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        await axios
            .put(
                `${BASE_URL}/instructor/update-scores/${exam_id}/${student}`,
                {
                    newScores: newScores,
                },
                config
            )
            .then((response) => {
                console.log("Updated Scores successfully!", response.data);
            })
            .catch((error) => {
                console.error("Error updating scores:", error);
            });
    };

    return (
        <>
            <div>EvalAnsSheetComp</div>
            <ul>
                {exams.map((exam) => (
                    <li key={exam.id}>
                        <h2>{exam.name}</h2>
                        <p>Description: {exam.description}</p>
                        <p>Start Time: {exam.start_time}</p>
                        <p>End Time: {exam.end_time}</p>
                        <p>Total Marks: {exam.total_marks}</p>
                        <h3>Enlisted Students Answer Sheets:</h3>
                        <div>
                            <h1>Results</h1>
                            {Object.keys(
                                scoreBoard(
                                    exam,
                                    exam.students_enlisted,
                                    exam.question_set
                                )
                            ).map((student) => (
                                <ResultComponent
                                    key={student}
                                    student={student}
                                    results={results[student]}
                                    onUpdateScores={handleUpdateScores}
                                    exam_id={exam.id}
                                />
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
