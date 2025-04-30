import "../styles/Sidebar.css";

const Sidebar = ({ setSection }) => {
    return (
        <div className="sidebar">
            <ul>
                <h2>
                TASKFLOW
                CLOUDDRIVE
                </h2>
                <li onClick={() => { setSection("tareas"); window.location.reload(); }}>📝 Tareas</li>
                <li onClick={() => setSection("archivos")}>📂 Archivos</li>
            </ul>
        </div>
    );
};

export default Sidebar;
