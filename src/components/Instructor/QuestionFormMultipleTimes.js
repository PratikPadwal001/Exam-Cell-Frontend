import React from "react";
import QuestionComponent from "./QuestionComp";

const QuestionFormMultipleTimes = ({ n, handleQuestionSubmit }) => {
    const components = Array.from({ length: n }, (_, index) => (
        <QuestionComponent
            key={index}
            question_number={index + 1}
            onQuestionSubmit={handleQuestionSubmit}
        />
    ));

    return <div>{components}</div>;
};

export default QuestionFormMultipleTimes;
