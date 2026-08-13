import axios from "axios";
import Job from "../models/Job.js";


// ==========================================
// JOB MATCHER - EXISTING
// ==========================================

export const analyzeJob = async (req, res) => {

    try {

        const response = await axios.post(

            "http://127.0.0.1:5001/job-match",

            {
                jobDescription:
                    req.body.jobDescription
            }

        );

        res.json(response.data);

    }

    catch (error) {

        console.error(
            "Job Match Error:",
            error
        );

        res.status(500).json({

            success: false,

            message: "Python server error"

        });

    }

};


// ==========================================
// CREATE JOB - ADMIN
// ==========================================

export const createJob = async (req, res) => {

    try {

        const {
            title,
            company,
            location,
            employmentType,
            salary,
            description,
            skills,
            experience,
            applicationDeadline,
            jobUrl
        } = req.body;


        if (
            !title ||
            !company ||
            !description
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Title, company and description are required."

            });

        }


        const job = await Job.create({

            title: title.trim(),

            company: company.trim(),

            location:
                location?.trim() || "",

            employmentType:
                employmentType || "Full-time",

            salary:
                salary?.trim() || "",

            description:
                description.trim(),

            skills:
                Array.isArray(skills)
                    ? skills
                    : [],

            experience:
                experience?.trim() || "Fresher",

            applicationDeadline:
                applicationDeadline || null,

            jobUrl:
                jobUrl?.trim() || "",

            postedBy:
                req.user.id

        });


        res.status(201).json({

            success: true,

            message:
                "Job posted successfully.",

            data: job

        });

    }

    catch (error) {

        console.error(
            "Create Job Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to create job."

        });

    }

};


// ==========================================
// GET ALL JOBS - ADMIN
// ==========================================

export const getAllJobs = async (req, res) => {

    try {

        const jobs = await Job.find({
            status: "Open"
        })
        .populate(
            "postedBy",
            "name email"
        )
        .sort({
            createdAt: -1
        });


        res.status(200).json({

            success: true,

            data: jobs

        });

    }

    catch (error) {

        console.error(
            "Get Jobs Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to load jobs."

        });

    }

};


// ==========================================
// GET SINGLE JOB
// ==========================================

export const getJobById = async (req, res) => {

    try {

        const job =
            await Job.findById(
                req.params.id
            ).populate(
                "postedBy",
                "name email"
            );


        if (!job) {

            return res.status(404).json({

                success: false,

                message:
                    "Job not found."

            });

        }


        res.status(200).json({

            success: true,

            data: job

        });

    }

    catch (error) {

        console.error(
            "Get Job Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to load job."

        });

    }

};


// ==========================================
// UPDATE JOB - ADMIN
// ==========================================

export const updateJob = async (req, res) => {

    try {

        const job =
            await Job.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new: true,
                    runValidators: true
                }

            );


        if (!job) {

            return res.status(404).json({

                success: false,

                message:
                    "Job not found."

            });

        }


        res.status(200).json({

            success: true,

            message:
                "Job updated successfully.",

            data: job

        });

    }

    catch (error) {

        console.error(
            "Update Job Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to update job."

        });

    }

};


// ==========================================
// DELETE JOB - ADMIN
// ==========================================

export const deleteJob = async (req, res) => {

    try {

        const job =
            await Job.findByIdAndDelete(
                req.params.id
            );


        if (!job) {

            return res.status(404).json({

                success: false,

                message:
                    "Job not found."

            });

        }


        res.status(200).json({

            success: true,

            message:
                "Job deleted successfully."

        });

    }

    catch (error) {

        console.error(
            "Delete Job Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to delete job."

        });

    }

};