import "../../styles/timeline.css";
import { motion } from "framer-motion";

import {
    FaFileAlt,
    FaChartLine,
    FaMicrophone,
    FaBriefcase,
    FaArrowRight
} from "react-icons/fa";

function ActivityTimeline() {

    const activities = [

        {
            icon: <FaFileAlt />,
            title: "Resume Uploaded",
            time: "Today"
        },

        {
            icon: <FaChartLine />,
            title: "ATS Score Improved",
            time: "Yesterday"
        },

        {
            icon: <FaMicrophone />,
            title: "Mock Interview Completed",
            time: "2 days ago"
        },

        {
            icon: <FaBriefcase />,
            title: "Applied for React Developer",
            time: "4 days ago"
        }

    ];

    return (

        <motion.div
            className="timeline-card"
            initial={{ opacity:0,x:40 }}
            animate={{ opacity:1,x:0 }}
            transition={{ duration:.6 }}
        >

            <h3 className="timeline-title">
                Recent Activity
            </h3>

            <div className="timeline-list">

                {activities.map((item,index)=>(

                    <div
                        className="timeline-item"
                        key={index}
                    >

                        <div className="timeline-dot"></div>

                        <div className="timeline-content">

                            <div className="timeline-icon">

                                {item.icon}

                            </div>

                            <div>

                                <h4>{item.title}</h4>

                                <p>{item.time}</p>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

            <button className="timeline-button">

                View Complete History

                <FaArrowRight/>

            </button>

        </motion.div>

    );

}

export default ActivityTimeline;