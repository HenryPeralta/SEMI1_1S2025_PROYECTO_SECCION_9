import "../styles/Sidebar.css";

const Sidebar = ({ setSection }) => {
    return (
        <div className="sidebar">
            <ul>
                <h1>
                TASKPLANNER
                </h1>
                <li onClick={() => { setSection("tareas"); window.location.reload(); }}>🗓️ Calendario</li>
                <li onClick={() => setSection("archivos")}>📂 Archivos</li>
                <li onClick={() => setSection("traductor")}>🔤 Traductor</li>
            </ul>
        </div>
    );
};

export default Sidebar;
