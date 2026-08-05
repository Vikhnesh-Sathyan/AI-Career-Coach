import "../../styles/jobcard.css";

import { useState } from "react";

import { motion } from "framer-motion";

import {
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaCalendarAlt,
    FaExternalLinkAlt,
    FaEllipsisV
} from "react-icons/fa";

import { deleteApplication } from "../../services/jobTrackerService";

function JobCard({ job, refresh }) {

    const [menuOpen, setMenuOpen] = useState(false);


    const gradients = [

        "linear-gradient(135deg,#3B82F6,#06B6D4)",
        "linear-gradient(135deg,#8B5CF6,#EC4899)",
        "linear-gradient(135deg,#F97316,#FACC15)",
        "linear-gradient(135deg,#10B981,#14B8A6)",
        "linear-gradient(135deg,#6366F1,#8B5CF6)"

    ];


    const gradient =
        gradients[job.company.length % gradients.length];


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


    const handleEdit = () => {

        console.log("Edit job:", job._id);

        // open edit modal here later

    };


const handleDelete = async () => {

    const confirmDelete = window.confirm(

        "Delete this application?"

    );

    if (!confirmDelete) return;

    try {

        const token = localStorage.getItem("token");

        const data = await deleteApplication(

            job._id,

            token

        );

        if (data.success) {

            alert("Application deleted.");

            refresh();

        }

        else {

            alert(data.message);

        }

    }

    catch (error) {

        console.log(error);

        alert("Delete failed.");

    }

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
                        job.company
                        .charAt(0)
                        .toUpperCase()
                    }

                </div>



                <div className="menu-container">


                    <button

                        className="more-btn"

                        onClick={() =>
                            setMenuOpen(!menuOpen)
                        }

                    >

                        <FaEllipsisV />

                    </button>



                    {

                    menuOpen && (

                        <div className="job-menu">


                            <button
                                onClick={handleEdit}
                            >

                                ✏️ Edit

                            </button>



                            {

                            job.jobUrl &&

                            <a

                                href={job.jobUrl}

                                target="_blank"

                                rel="noreferrer"

                            >

                                🔗 Open Job

                            </a>

                            }



                            <button

                                className="delete-btn"

                                onClick={handleDelete}

                            >

                                🗑 Delete

                            </button>


                        </div>

                    )

                    }


                </div>


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

                    {aiScore[job.status] || 0}%

                </span>


            </div>




            <div className="progress">


                <div

                    className="progress-fill"

                    style={{

                        width:`${progress[job.status] || 0}%`

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
                        job.appliedDate
                        ?
                        new Date(
                            job.appliedDate
                        )
                        .toLocaleDateString()
                        :
                        "No Date"
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