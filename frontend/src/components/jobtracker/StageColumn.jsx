import "../../styles/stagecolumn.css";

import { motion } from "framer-motion";

import { Droppable } from "@hello-pangea/dnd";

import JobCard from "./JobCard";

function StageColumn({

    title,

    jobs,

    refresh,

    setEditData,

    showToast

}) {

const colors = {

    Applied: "#3B82F6",

    Shortlisted: "#8B5CF6",

    Assessment: "#F59E0B",

    Interview: "#EC4899",

    Offer: "#10B981",

    Rejected: "#EF4444",

    Accepted: "#22C55E"

};

    return (

        <Droppable droppableId={title}>

            {(provided, snapshot) => (

                <motion.div

                    className={`stage-column ${

                        snapshot.isDraggingOver

                            ? "drag-over"

                            : ""

                    }`}

                    ref={provided.innerRef}

                    {...provided.droppableProps}

                    initial={{

                        opacity:0,

                        y:30

                    }}

                    animate={{

                        opacity:1,

                        y:0

                    }}

                    transition={{

                        duration:.4

                    }}

                >

                    <div

                        className="stage-header"

                        style={{

                            borderColor: colors[title]

                        }}

                    >

                        <div

                            className="stage-dot"

                            style={{

                                background: colors[title]

                            }}

                        />

                        <h2>{title}</h2>

                        <span>{jobs.length}</span>

                    </div>

                    <div className="stage-content">

                        {

                            jobs.length === 0 &&

                            !snapshot.isDraggingOver && (

                                <div className="empty-stage">

                                    No Applications

                                </div>

                            )

                        }

                        {

                            jobs.map((job, index) => (

                                <JobCard

                                    key={job._id}

                                    index={index}

                                    job={job}

                                    refresh={refresh}

                                    setEditData={setEditData}

                                    showToast={showToast}

                                />

                            ))

                        }

                        {provided.placeholder}

                    </div>

                </motion.div>

            )}

        </Droppable>

    );

}

export default StageColumn;