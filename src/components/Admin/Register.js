import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../api/api";

function Register() {
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        role: "",
    });

    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/admin/create-user`,
                formData
            );
            if (response.data.success) {
                navigate("/login");
            }
        } catch (error) {
            setError("Error creating user: ", error.message);
            console.error("Error creating user: ", error.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
            />
            <input
                type="first_name"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleInputChange}
            />
            <input
                type="last_name"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleInputChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
            />
            <input
                type="role"
                name="role"
                placeholder="Role"
                value={formData.role}
                onChange={handleInputChange}
            />
            <button onClick={handleRegister}>Register</button>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Register;
