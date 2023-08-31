import React from "react";
import { Link } from "react-router-dom";

export default function Instructor() {
    return (
        <div>
            <div>
                <Link to="/create-exam">Create Exam</Link>
            </div>
            <div>
                <Link to="/eval-ans-sheet">Evaluate Answer Sheets</Link>
            </div>
        </div>
    );
}
