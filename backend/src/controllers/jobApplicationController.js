import JobApplication from "../models/JobApplication.js";


// Add Application
export const addApplication = async (req, res) => {

    try {

        const application = await JobApplication.create({

            userId: req.user.id,

            company: req.body.company,

            role: req.body.role,

            location: req.body.location,

            jobUrl: req.body.jobUrl,

            salary: req.body.salary,

            status: req.body.status,

            priority: req.body.priority,

            appliedDate: req.body.appliedDate,

            interviewDate: req.body.interviewDate,

            notes: req.body.notes

        });

        res.status(201).json({

            success: true,

            message: "Application added successfully",

            data: application

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// Get All Applications
export const getApplications = async (req, res) => {

    try {

        const applications = await JobApplication.find({

            userId: req.user.id

        }).sort({

            createdAt: -1

        });

        res.json({

            success: true,

            data: applications

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// Get Single Application
export const getApplicationById = async (req, res) => {

    try {

        const application = await JobApplication.findOne({

            _id: req.params.id,

            userId: req.user.id

        });

        if (!application) {

            return res.status(404).json({

                success: false,

                message: "Application not found"

            });

        }

        res.json({

            success: true,

            data: application

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// Update Application
export const updateApplication = async (req, res) => {

    try {

        const application = await JobApplication.findOneAndUpdate(

            {

                _id: req.params.id,

                userId: req.user.id

            },

            req.body,

            {

                new: true

            }

        );

        if (!application) {

            return res.status(404).json({

                success: false,

                message: "Application not found"

            });

        }

        res.json({

            success: true,

            message: "Application updated successfully",

            data: application

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// Delete Application
export const deleteApplication = async (req, res) => {

    try {

        const application = await JobApplication.findOneAndDelete({

            _id: req.params.id,

            userId: req.user.id

        });

        if (!application) {

            return res.status(404).json({

                success: false,

                message: "Application not found"

            });

        }
        await application.deleteOne();
        res.json({

            success: true,

            message: "Application deleted successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// Dashboard Statistics
export const getApplicationStats = async (req, res) => {

    try {

        const applications = await JobApplication.find({

            userId: req.user.id

        });

        const stats = {

            total: applications.length,

            applied: applications.filter(

                item => item.status === "Applied"

            ).length,

            interview: applications.filter(

                item => item.status === "Interview"

            ).length,

            offer: applications.filter(

                item => item.status === "Offer"

            ).length,

            rejected: applications.filter(

                item => item.status === "Rejected"

            ).length

        };

        res.json({

            success: true,

            data: stats

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};