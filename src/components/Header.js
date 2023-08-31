import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const retrievedJsonString = sessionStorage.getItem("user");
    const user = JSON.parse(retrievedJsonString);

    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("success");
        navigate("/");
    };

    return (
        <div className="header">
            {sessionStorage.getItem("user") ? (
                <>
                    <h3>
                        <Link to={`/dashboard/${user.role}`}>ExamPanel</Link>
                    </h3>
                    <div>{user.username}</div>
                    <div>{user.role}</div>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <h3>Exam Panel</h3>
            )}
        </div>
    );
}
