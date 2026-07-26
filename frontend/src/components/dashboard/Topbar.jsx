import "../../styles/topbar.css";

import {
    FaBell,
    FaSearch
} from "react-icons/fa";

import { motion } from "framer-motion";

function Topbar() {

    const currentHour = new Date().getHours();

    let greeting = "Good Evening";

    if (currentHour < 12) greeting = "Good Morning";
    else if (currentHour < 18) greeting = "Good Afternoon";

    return (

        <motion.div
            className="topbar"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: .6 }}
        >

            <div>

                <h1>{greeting}, Vikhnesh 👋</h1>

                <p>
                    Ready to build your dream career today?
                </p>

            </div>

            <div className="topbar-right">

                <div className="search-box">

                    <FaSearch className="search-icon"/>

                    <input
                        type="text"
                        placeholder="Search..."
                    />

                </div>

                <div className="notification">

                    <FaBell/>

                    <span className="notification-dot"></span>

                </div>

                <div className="profile">

                    <div className="avatar">
                        VS
                    </div>

                    <div>

                        <h4>Vikhnesh</h4>

                        <span>Developer</span>

                    </div>

                </div>

            </div>

        </motion.div>

    );

}

export default Topbar;