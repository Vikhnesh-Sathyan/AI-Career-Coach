import SupportRequest from "../models/SupportRequest.js";
import User from "../models/User.js";

// ==========================================
// CREATE ACCOUNT REVIEW REQUEST
// ==========================================

export const createSupportRequest = async (req, res) => {

    try {

        const {
            email,
            message
        } = req.body;


        // Validate fields

        if (!email || !message || !message.trim()) {

            return res.status(400).json({

                success: false,

                message:
                    "Email and message are required."

            });

        }


        // Find user

        const user =
            await User.findOne({
                email: email.trim().toLowerCase()
            });


        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "No account found with this email."

            });

        }


        // User must be suspended

        if (user.status !== "suspended") {

            return res.status(400).json({

                success: false,

                message:
                    "Account review is only available for suspended accounts."

            });

        }


        // Check existing pending request

        const existingRequest =
            await SupportRequest.findOne({

                user: user._id,

                status: "pending"

            });


        if (existingRequest) {

            return res.status(400).json({

                success: false,

                message:
                    "You already have a pending account review request."

            });

        }


        // Create request

        const supportRequest =
            await SupportRequest.create({

                user: user._id,

                message: message.trim(),

                status: "pending",

                read: false

            });


        res.status(201).json({

            success: true,

            message:
                "Account review request submitted successfully.",

            data: {

                id:
                    supportRequest._id,

                status:
                    supportRequest.status,

                message:
                    supportRequest.message

            }

        });

    }

    catch (error) {

        console.error(
            "Create Support Request Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to submit account review request."

        });

    }

};


// ==========================================
// GET MY ACCOUNT REVIEW REQUEST
// ==========================================

export const getMySupportRequest = async (req, res) => {
    try {
        const userId = req.user.id;

        const request = await SupportRequest.findOne({
            user: userId
        }).sort({
            createdAt: -1
        });

        if (!request) {
            return res.status(200).json({
                success: true,
                data: null
            });
        }

        res.status(200).json({
            success: true,
            data: {
                id: request._id,
                message: request.message,
                status: request.status,
                adminResponse: request.adminResponse,
                createdAt: request.createdAt
            }
        });

    } catch (error) {
        console.error(
            "Get Support Request Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to load request status."
        });
    }
};


// ==========================================
// GET ALL SUPPORT REQUESTS - ADMIN
// ==========================================

export const getAllSupportRequests = async (req, res) => {

    try {

        const requests = await SupportRequest.find({})
            .populate(
                "user",
                "name email"
            )
            .sort({
                createdAt: -1
            });

        res.status(200).json({

            success: true,

            data: requests

        });

    } catch (error) {

        console.error(
            "Get Support Requests Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to load support requests."

        });

    }

};


// ==========================================
// UPDATE SUPPORT REQUEST
// ==========================================

export const updateSupportRequest = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            status,
            adminResponse
        } = req.body;


        // Validate status

        if (
            !["approved", "rejected"].includes(status)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid request status."

            });

        }


        const request =
            await SupportRequest.findById(id);


        if (!request) {

            return res.status(404).json({

                success: false,

                message:
                    "Support request not found."

            });

        }


        // Update request

        request.status = status;

        request.adminResponse =
            adminResponse || "";

        request.read = true;


        await request.save();


        // =====================================
        // APPROVE USER
        // =====================================

        if (status === "approved") {

            await User.findByIdAndUpdate(
                request.user,
                {
                    status: "active"
                }
            );

        }


        res.status(200).json({

            success: true,

            message:
                status === "approved"
                    ? "Request approved successfully."
                    : "Request rejected successfully.",

            data: {

                id: request._id,

                status: request.status,

                adminResponse:
                    request.adminResponse

            }

        });

    } catch (error) {

        console.error(
            "Update Support Request Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to update support request."

        });

    }

};


