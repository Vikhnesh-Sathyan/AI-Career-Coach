import "../../styles/resumehealth.css";

import { motion } from "framer-motion";

import {
    FaCheckCircle,
    FaExclamationTriangle
} from "react-icons/fa";

function ResumeHealth({ analysis }) {

    if (!analysis) return null;

    const checks = [

        {
            title: "Name",
            ok: analysis.name !== ""
        },

        {
            title: "Email",
            ok: analysis.email !== ""
        },

        {
            title: "Phone",
            ok: analysis.phone !== ""
        },

        {
            title: "Skills",
            ok: analysis.skills.length >= 8
        },

        {
            title: "Git",
            ok: analysis.skills.includes("Git")
        },

        {
            title: "REST API",
            ok: analysis.skills.includes("REST API")
        }

    ];

    const health = Math.round(

        checks.filter(item => item.ok).length / checks.length * 100

    );

    return (

        <motion.div

            className="health-card"

            initial={{ opacity:0,y:30 }}

            animate={{ opacity:1,y:0 }}

            transition={{ duration:.7 }}

        >

            <h2>

                Resume Health

            </h2>

            {

                checks.map(item=>(

                    <div

                        className="health-item"

                        key={item.title}

                    >

                        {

                            item.ok ?

                            <FaCheckCircle className="ok"/>

                            :

                            <FaExclamationTriangle className="warning"/>

                        }

                        <span>

                            {item.title}

                        </span>

                    </div>

                ))

            }

            <div className="health-score">

                Overall Health

                <strong>

                    {health}%

                </strong>

            </div>

        </motion.div>

    );

}

export default ResumeHealth;