import "../../styles/stagecolumn.css";

import { motion } from "framer-motion";

import JobCard from "./JobCard";

function StageColumn({

    title,

    jobs,

    refresh

}) {

    const colors = {

        Applied: "#3B82F6",

        Shortlisted: "#8B5CF6",

        Assessment: "#F59E0B",

        Interview: "#EC4899",

        Offer: "#10B981",

        Rejected: "#EF4444"

    };

    return (

        <motion.div

            className="stage-column"

            initial={{

                opacity:0,

                y:30

            }}

            animate={{

                opacity:1,

                y:0

            }}

        >

            <div

                className="stage-header"

                style={{

                    borderColor:colors[title]

                }}

            >

                <div

                    className="stage-dot"

                    style={{

                        background:colors[title]

                    }}

                />

                <h2>

                    {title}

                </h2>

                <span>

                    {jobs.length}

                </span>

            </div>

            <div className="stage-content">

                {

                    jobs.length===0

                    ?

                    (

                        <div className="empty-stage">

                            No Applications

                        </div>

                    )

                    :

                    jobs.map(job=>(

                        <JobCard

                            key={job._id}

                            job={job}

                            refresh={refresh}

                        />

                    ))

                }

            </div>

        </motion.div>

    );

}

export default StageColumn;