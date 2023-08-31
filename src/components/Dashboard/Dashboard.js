import StudentDashboard from "./Student";
import InstructorDashboard from "./Instructor";
import AdminDashboard from "./Admin";
import { useParams } from "react-router-dom";

const Dashboard = () => {
    const { role } = useParams();
    return (
        <div>
            {role === "student" && <StudentDashboard />}
            {role === "instructor" && <InstructorDashboard />}
            {role === "admin" && <AdminDashboard />}
            {role !== "student" &&
                role !== "instructor" &&
                role !== "admin" && <div>Invalid role</div>}
        </div>
    );
};

export default Dashboard;
