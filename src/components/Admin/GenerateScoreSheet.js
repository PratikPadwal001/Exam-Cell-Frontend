import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchScores } from "../../features/admin/adminSlice";

export default function GenerateScoreSheet() {
    const dispatch = useDispatch();
    const { scores } = useSelector((state) => state.admin);
    const [targetUserId, setTargetUserId] = useState(0);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        dispatch(fetchScores());
    }, [dispatch]);

    const handleSubmit = () => {
        const userExams = scores.filter(
            (user) => user.user_id === parseInt(targetUserId)
        );
        setFilteredData(userExams);
    };

    return (
        <div>
            <h1>User Filter</h1>
            <label>
                User ID:
                <input
                    type="text"
                    value={targetUserId}
                    onChange={(e) => setTargetUserId(e.target.value)}
                />
            </label>
            <button onClick={handleSubmit}>Submit</button>

            {filteredData.length === 0 ? (
                <div>No instances found for the specified user ID</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Exam ID</th>
                            <th>Total Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((user, index) => (
                            <tr key={index}>
                                <td>{user.user_id}</td>
                                <td>{user.exam_id}</td>
                                <td>
                                    {user.scores
                                        ? user.scores.reduce(
                                              (acc, curr) => acc + curr,
                                              0
                                          )
                                        : "Unchecked"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
