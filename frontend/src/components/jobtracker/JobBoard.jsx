import "../../styles/jobboard.css";

import StageColumn from "./StageColumn";

function JobBoard({

    applications,

    refresh,

    setEditData

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

                    />

                ))

            }

        </div>

    );

}

export default JobBoard;