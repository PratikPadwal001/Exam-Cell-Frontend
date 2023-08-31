import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function AnswerSheet() {
    const { examId } = useParams();
    const { exams, answers } = useSelector((state) => state.student);
    const questions = exams.find((item) => item.id === parseInt(examId));
    const examAnswers = answers.find(
        (item) => item.exam_id === parseInt(examId)
    );

    const total_marks = questions.question_set
        .map((x) => x.marks)
        .reduce((acc, curr) => acc + curr, 0);
    const obtained_marks = examAnswers.scores.reduce(
        (acc, curr) => acc + curr,
        0
    );
    return (
        <div>
            <div>QuestionSheet</div>
            <div>{questions.name}</div>
            <div>
                {questions.question_set.map((item, index) => (
                    <div key={index}>
                        <div>{item.question}</div>
                        <div>Answer: {examAnswers.answers[index]}</div>
                        <div>
                            Score: {examAnswers.scores[index]} / {item.marks}
                        </div>
                    </div>
                ))}
            </div>
            <h4>
                Overall Marks: {obtained_marks}/{total_marks}
            </h4>
        </div>
    );
}
