import "../../styles/sidebar.css";

import {
    FaHome,
    FaFileAlt,
    FaChartLine,
    FaBriefcase,
    FaMicrophone,
    FaCog,
    FaSignOutAlt,
    FaRobot,
    FaHistory
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Sidebar() {

    const menu = [

        {
            icon: <FaHome />,
            title: "Dashboard",
            path: "/dashboard"
        },

        {
            icon: <FaFileAlt />,
            title: "Resume",
            path: "/resume"
        },

        {
            icon: <FaChartLine />,
            title: "ATS Score",
            path: "/ats"
        },

        {
             icon: <FaHistory />,
             title: "Match History",
             path: "/match-history"
        },

        {
            icon: <FaMicrophone />,
            title: "Interviews",
            path: "/interviews"
        },

        {
            icon: <FaBriefcase />,
            title: "Jobs",
            path: "/jobs"
        },

        {
            icon: <FaCog />,
            title: "Settings",
            path: "/settings"
        },
        {
              icon:<FaHistory />,
              title:"Interview History",
              path:"/interview-history"
    }
    ];

    return (

        <aside className="sidebar">

            <div className="sidebar-logo">

                <FaRobot className="robot-icon" />

                <span>AI Coach</span>

            </div>

            <nav className="sidebar-menu">

                {

                    menu.map((item) => (

                        <NavLink
                            key={item.title}
                            to={item.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "menu-item active"
                                    : "menu-item"
                            }
                        >

                            {item.icon}

                            <span>{item.title}</span>

                        </NavLink>

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