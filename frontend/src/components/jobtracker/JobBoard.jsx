import "../../styles/jobboard.css";

import StageColumn from "./StageColumn";

function JobBoard({ applications, refresh }) {

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

                stages.map(stage => (

                    <StageColumn

                        key={stage}

                        title={stage}

                        refresh={refresh}

                        jobs={

                            applications.filter(

                                job => job.status === stage

                            )

                        }

                    />

                ))

            }

        </div>

    );

}

export default JobBoard;