import "../../styles/quickactions.css";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
    FaFileAlt,
    FaSearch,
    FaMicrophone,
    FaBriefcase,
    FaArrowRight
} from "react-icons/fa";

function QuickActions() {

    const navigate = useNavigate();

    const actions = [

        {
            title: "Resume Analyzer",
            subtitle: "Analyze your resume",
            icon: <FaFileAlt />,
            path: "/resume"
        },

        {
            title: "Job Matcher",
            subtitle: "Match with Job Description",
            icon: <FaSearch />,
            path: "/job-matcher"
        },

        {
            title: "Mock Interview",
            subtitle: "Practice interviews",
            icon: <FaMicrophone />,
            path: "/interviews"
        },

        {
            title: "Job Tracker",
            subtitle: "Track applications",
            icon: <FaBriefcase />,
            path: "/jobs"
        }

    ];

    return (

        <div className="quick-actions">

            {

                actions.map((action, index) => (

                    <motion.div

                        key={action.title}

                        className="action-card"

                        initial={{ opacity: 0, y: 30 }}

                        animate={{ opacity: 1, y: 0 }}

                        transition={{
                            delay: index * 0.1
                        }}

                        whileHover={{
                            y: -8,
                            scale: 1.03
                        }}

                        onClick={() => navigate(action.path)}

                    >

                        <div className="action-icon">

                            {action.icon}

                        </div>

                        <div className="action-content">

                            <h3>{action.title}</h3>

                            <p>{action.subtitle}</p>

                        </div>

                        <FaArrowRight className="arrow" />

                    </motion.div>

                ))

            }

        </div>

    );

}

export default QuickActions;