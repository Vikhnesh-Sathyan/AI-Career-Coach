import "../../styles/jobboard.css";

import StageColumn from "./StageColumn";

function JobBoard({

    applications,
    refresh,
    setEditData,
    showToast

}) {

    const stages = [

        "Applied",
        "Shortlisted",
        "Assessment",
        "Interview",
        "Offer",
        "Rejected"

    ];

    return (

        <div className="job-board">

            {

                stages.map((stage) => (

                    <StageColumn

                        key={stage}

                        title={stage}

                        jobs={

                            applications.filter(

                                (job) => job.status === stage

                            )

                        }

                        refresh={refresh}

                        setEditData={setEditData}

                        showToast={showToast}

                    />

                ))

            }

        </div>

    );

}

export default JobBoard;