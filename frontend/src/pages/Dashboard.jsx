import { useState } from "react";
import Sidebar from "./Sidebar";
import Tareas from "./tareas";
import Archivos from "./Archivos";
import "../styles/Dashboard.css";

const Dashboard = ({ userId }) => {
    const [section, setSection] = useState("tareas");

    return (
        <div className="dashboard-container">
            <Sidebar setSection={setSection} />
            <div className="dashboard-content">
                {section === "tareas" && <Tareas userId={userId} />}
                {section === "archivos" && <Archivos userId={userId} />}
            </div>
        </div>
    );
};

export default Dashboard;
