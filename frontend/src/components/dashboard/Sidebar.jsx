import "../../styles/sidebar.css";

import {
    FaHome,
    FaFileAlt,
    FaChartLine,
    FaBriefcase,
    FaMicrophone,
    FaCog,
    FaSignOutAlt,
    FaRobot
} from "react-icons/fa";

function Sidebar() {

    const menu = [
        { icon: <FaHome />, title: "Dashboard" },
        { icon: <FaFileAlt />, title: "Resume" },
        { icon: <FaChartLine />, title: "ATS Score" },
        { icon: <FaMicrophone />, title: "Interviews" },
        { icon: <FaBriefcase />, title: "Jobs" },
        { icon: <FaCog />, title: "Settings" }
    ];

    return (
        <aside className="sidebar">

            <div className="sidebar-logo">
                <FaRobot className="robot-icon" />
                <span>AI Coach</span>
            </div>

            <nav className="sidebar-menu">

                {
                    menu.map((item, index) => (
                        <div
                            className={`menu-item ${index === 0 ? "active" : ""}`}
                            key={index}
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </div>
                    ))
                }

            </nav>

            <div className="logout-btn">
                <FaSignOutAlt />
                <span>Logout</span>
            </div>

        </aside>
    );
}

export default Sidebar;