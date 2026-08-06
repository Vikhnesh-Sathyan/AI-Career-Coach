import "../../styles/jobboard.css";

import { DragDropContext } from "@hello-pangea/dnd";

import StageColumn from "./StageColumn";

import { updateStatus } from "../../services/jobTrackerService";

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

    const handleDragEnd = async (result) => {

        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (

            destination.droppableId === source.droppableId

        ) {

            return;

        }

        try {

            const token = localStorage.getItem("token");

            const data = await updateStatus(

                draggableId,

                destination.droppableId,

                token

            );

            if (data.success) {

                showToast(

                    `Moved to ${destination.droppableId}`

                );

                refresh();

            }

            else {

                showToast(

                    data.message,

                    "error"

                );

            }

        }

        catch (error) {

            console.log(error);

            showToast(

                "Failed to update status",

                "error"

            );

        }

    };

    return (

        <DragDropContext

            onDragEnd={handleDragEnd}

        >

            <div className="job-board">

                {

                    stages.map((stage) => (

                        <StageColumn

                            key={stage}

                            title={stage}

                            jobs={

                                applications.filter(

                                    job =>

                                        job.status === stage

                                )

                            }

                            refresh={refresh}

                            setEditData={setEditData}

                            showToast={showToast}

                        />

                    ))

                }

            </div>

        </DragDropContext>

    );

}

export default JobBoard;