import "../../styles/adminsidebar.css";

import { NavLink } from "react-router-dom";

import { motion } from "framer-motion";

import {
    FaChartPie,
    FaUsers,
    FaFileAlt,
    FaBriefcase,
    FaMicrophone,
    FaChartLine,
    FaGem,
    FaCog
} from "react-icons/fa";

const menus = [

    {
        name:"Dashboard",
        icon:<FaChartPie />,
        path:"/admin"
    },

    {
        name:"Users",
        icon:<FaUsers />,
        path:"/admin/users"
    },

    {
        name:"Resume",
        icon:<FaFileAlt />,
        path:"/admin/resumes"
    },

    {
        name:"Jobs",
        icon:<FaBriefcase />,
        path:"/admin/jobs"
    },

    {
        name:"Interview",
        icon:<FaMicrophone />,
        path:"/admin/interviews"
    },

    {
        name:"Analytics",
        icon:<FaChartLine />,
        path:"/admin/analytics"
    },

    {
        name:"Premium",
        icon:<FaGem />,
        path:"/admin/premium"
    },

    {
        name:"Settings",
        icon:<FaCog />,
        path:"/admin/settings"
    }

];

function AdminSidebar(){

    return(

        <motion.aside

            className="admin-sidebar"

            initial={{
                x:-80,
                opacity:0
            }}

            animate={{
                x:0,
                opacity:1
            }}

            transition={{
                duration:.6
            }}

        >

            <div className="sidebar-logo">

                <motion.div

                    className="logo-circle"

                    animate={{

                        scale:[1,1.15,1]

                    }}

                    transition={{

                        duration:2.5,

                        repeat:Infinity

                    }}

                />

                <div>

                    <h2>AI Career Coach</h2>

                    <p>Admin Console</p>

                </div>

            </div>

            <div className="sidebar-menu">

                {

                    menus.map(menu=>(

                        <NavLink

                            key={menu.name}

                            to={menu.path}

                            className={({isActive})=>

                                isActive

                                ?

                                "menu-item active"

                                :

                                "menu-item"

                            }

                        >

                            <motion.div

                                whileHover={{

                                    x:10,

                                    scale:1.03

                                }}

                                transition={{

                                    type:"spring",

                                    stiffness:350

                                }}

                                className="menu-content"

                            >

                                <span>

                                    {menu.icon}

                                </span>

                                <p>

                                    {menu.name}

                                </p>

                            </motion.div>

                        </NavLink>

                    ))

                }

            </div>

            <div className="storage-card">

                <h4>

                    Storage

                </h4>

                <div className="storage-bar">

                    <motion.div

                        className="storage-fill"

                        initial={{

                            width:0

                        }}

                        animate={{

                            width:"72%"

                        }}

                        transition={{

                            duration:1.2

                        }}

                    />

                </div>

                <small>

                    2.4 GB / 5 GB

                </small>

            </div>

            <div className="admin-profile">

                <div className="profile-avatar">

                    A

                </div>

                <div>

                    <h4>

                        Administrator

                    </h4>

                    <span>

                        ● Online

                    </span>

                </div>

            </div>

        </motion.aside>

    );

}

export default AdminSidebar;