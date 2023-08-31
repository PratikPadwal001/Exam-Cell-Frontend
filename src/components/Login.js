import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/api";

const Login = () => {
    let navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, {
                username,
                password,
            });
            const jsonString = JSON.stringify(response.data.user);
            sessionStorage.setItem("success", response.data.success);
            sessionStorage.setItem("user", jsonString);
            if (sessionStorage.getItem("success")) {
                navigate("/dashboard/" + response.data.user.role);
            }
        } catch (error) {
            // Handle error, e.g. display error message
            console.error("Login error:", error);
        }
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Login;
