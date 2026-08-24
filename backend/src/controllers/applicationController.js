
import Application from "../models/Application.js";
import Job from "../models/Job.js";


// ==========================================
// APPLY FOR JOB - USER
// ==========================================

export const applyForJob = async (req, res) => {

    try {

        const { jobId } = req.body;

        const userId = req.user.id;


        // ==========================================
        // VALIDATE JOB ID
        // ==========================================

        if (!jobId) {

            return res.status(400).json({

                success: false,

                message: "Job ID is required."

            });

        }


        // ==========================================
        // FIND JOB
        // ==========================================

        const job =
            await Job.findById(jobId);


        if (!job) {

            return res.status(404).json({

                success: false,

                message: "Job not found."

            });

        }


        // ==========================================
        // CHECK JOB STATUS
        // ==========================================

        if (job.status !== "Open") {

            return res.status(400).json({

                success: false,

                message: "This job is no longer accepting applications."

            });

        }


        // ==========================================
        // CHECK DEADLINE
        // ==========================================

        if (
            job.applicationDeadline &&
            new Date(job.applicationDeadline) < new Date()
        ) {

            return res.status(400).json({

                success: false,

                message: "The application deadline has passed."

            });

        }


        // ==========================================
        // CHECK DUPLICATE APPLICATION
        // ==========================================

        const existingApplication =
            await Application.findOne({

                job: jobId,

                applicant: userId

            });


        if (existingApplication) {

            return res.status(400).json({

                success: false,

                message: "You have already applied for this job."

            });

        }


        // ==========================================
        // CREATE APPLICATION
        // ==========================================

        const application =
            await Application.create({

                job: jobId,

                applicant: userId,

                status: "Applied"

            });


        // ==========================================
        // RESPONSE
        // ==========================================

        res.status(201).json({

            success: true,

            message: "Application submitted successfully.",

            data: application

        });

    }


    catch (error) {

        console.error(
            "Apply Job Error:",
            error
        );


        res.status(500).json({

            success: false,

            message: "Failed to submit application."

        });

    }

};



// ==========================================
// GET MY APPLICATIONS - USER
// ==========================================

export const getMyApplications = async (req, res) => {

    try {

        const userId = req.user.id;


        const applications =
            await Application.find({

                applicant: userId

            })
            .populate(
                "job"
            )
            .sort({

                createdAt: -1

            });


        res.status(200).json({

            success: true,

            data: applications

        });

    }


    catch (error) {

        console.error(
            "Get My Applications Error:",
            error
        );


        res.status(500).json({

            success: false,

            message: "Failed to load applications."

        });

    }

};




// ==========================================
// GET APPLICATIONS FOR JOB - ADMIN
// ==========================================

export const getJobApplications = async (req, res) => {

    try {

        const { jobId } = req.params;


        const applications =
            await Application.find({

                job: jobId

            })
            .populate(
                "applicant",
                "name email"
            )
            .populate(
                "job",
                "title company"
            )
            .sort({

                createdAt: -1

            });


        res.status(200).json({

            success: true,

            data: applications

        });

    }


    catch (error) {

        console.error(
            "Get Job Applications Error:",
            error
        );


        res.status(500).json({

            success: false,

            message: "Failed to load applications."

        });

    }

};



// ==========================================
// UPDATE APPLICATION STATUS - ADMIN
// ==========================================

export const updateApplicationStatus = async (req, res) => {

    try {

        const { applicationId } =
            req.params;

        const { status } =
            req.body;


        // ==========================================
        // VALID STATUS
        // ==========================================

        const validStatuses = [

            "Applied",

            "Shortlisted",

            "Interview",

            "Selected",

            "Rejected"

        ];


        if (!validStatuses.includes(status)) {

            return res.status(400).json({

                success: false,

                message: "Invalid application status."

            });

        }


        // ==========================================
        // UPDATE APPLICATION
        // ==========================================

        const application =
            await Application.findByIdAndUpdate(

                applicationId,

                {
                    status
                },

                {
                    returnDocument: "after",

                    runValidators: true

                }

            );


        if (!application) {

            return res.status(404).json({

                success: false,

                message: "Application not found."

            });

        }


        res.status(200).json({

            success: true,

            message: "Application status updated successfully.",

            data: application

        });

    }


    catch (error) {

        console.error(
            "Update Application Status Error:",
            error
        );


        res.status(500).json({

            success: false,

            message: "Failed to update application status."

        });

    }

};



// ==========================================
// GET ALL APPLICATIONS - ADMIN
// ==========================================

export const getAllApplications = async (req, res) => {

    try {

        const applications =
            await Application.find()
                .populate(
                    "applicant",
                    "name email"
                )
                .populate(
                    "job",
                    "title company location status"
                )
                .sort({
                    createdAt: -1
                });


        res.status(200).json({

            success: true,

            data: applications

        });

    }

    catch (error) {

        console.error(
            "Get All Applications Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to load applications."

        });

    }

};