import "../../styles/jobcard.css";

import { motion } from "framer-motion";

import {

    FaMapMarkerAlt,

    FaMoneyBillWave,

    FaCalendarAlt,

    FaExternalLinkAlt,

    FaEllipsisV

} from "react-icons/fa";

function JobCard({ job }) {

    const gradients = [

        "linear-gradient(135deg,#3B82F6,#06B6D4)",

        "linear-gradient(135deg,#8B5CF6,#EC4899)",

        "linear-gradient(135deg,#F97316,#FACC15)",

        "linear-gradient(135deg,#10B981,#14B8A6)",

        "linear-gradient(135deg,#6366F1,#8B5CF6)"

    ];

    const gradient = gradients[
        job.company.length % gradients.length
    ];

    const progress = {

        Applied:20,

        Shortlisted:35,

        Assessment:55,

        Interview:75,

        Offer:100,

        Rejected:100

    };

    const aiScore = {

        Applied:62,

        Shortlisted:71,

        Assessment:79,

        Interview:88,

        Offer:100,

        Rejected:15

    };

    return (

        <motion.div

            className="job-card"

            whileHover={{

                y:-8,

                scale:1.02

            }}

        >

            <div className="card-top">

                <div

                    className="company-avatar"

                    style={{

                        background:gradient

                    }}

                >

                    {

                        job.company.charAt(0).toUpperCase()

                    }

                </div>

                <button className="more-btn">

                    <FaEllipsisV />

                </button>

            </div>

            <h2>

                {job.company}

            </h2>

            <p className="role">

                {job.role}

            </p>

            <div className="progress-header">

                <span>

                    AI Success

                </span>

                <span>

                    {

                        aiScore[job.status]

                    }%

                </span>

            </div>

            <div className="progress">

                <div

                    className="progress-fill"

                    style={{

                        width:`${progress[job.status]}%`

                    }}

                />

            </div>

            <div className="job-info">

                <p>

                    <FaMapMarkerAlt />

                    {job.location || "Remote"}

                </p>

                <p>

                    <FaMoneyBillWave />

                    {job.salary || "Not Specified"}

                </p>

                <p>

                    <FaCalendarAlt />

                    {

                        new Date(

                            job.appliedDate

                        ).toLocaleDateString()

                    }

                </p>

            </div>

            <div className="bottom">

                <span className="priority">

                    {job.priority}

                </span>

                {

                    job.jobUrl &&

                    <a

                        href={job.jobUrl}

                        target="_blank"

                        rel="noreferrer"

                    >

                        <FaExternalLinkAlt />

                    </a>

                }

            </div>

        </motion.div>

    );

}

export default JobCard;