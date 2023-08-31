import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/admin/adminSlice";

export default function ViewUsersData() {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    const [filteredRole, setFilteredRole] = useState("");

    const handleRoleChange = (e) => {
        setFilteredRole(e.target.value);
    };

    const filteredUserData = filteredRole
        ? users.filter((user) => user.role === filteredRole)
        : users;

    return (
        <div>
            <h1>User Data Table</h1>
            <label>
                Filter by Role:
                <select value={filteredRole} onChange={handleRoleChange}>
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                </select>
            </label>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Userame</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUserData.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
