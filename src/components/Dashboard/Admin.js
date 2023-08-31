import React from "react";
import { Link } from "react-router-dom";

export default function Admin() {
    return (
        <div>
            <div>
                <Link to="/register">Register</Link>
            </div>
            <div>
                <Link to="/generate-score-sheet">Generate Score Sheet</Link>
            </div>
            <div>
                <Link to="/view-users-data">View Users Data</Link>
            </div>
        </div>
    );
}
