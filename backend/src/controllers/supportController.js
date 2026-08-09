import SupportRequest from "../models/SupportRequest.js";
import User from "../models/User.js";

// ==========================================
// CREATE ACCOUNT REVIEW REQUEST
// ==========================================

export const createSupportRequest = async (req, res) => {

    try {

        const userId = req.user.id;

        const { message } = req.body;


        // -------------------------------
        // Validate message
        // -------------------------------

        if (!message || !message.trim()) {

            return res.status(400).json({

                success: false,

                message:
                    "Please enter a message."

            });

        }


        // -------------------------------
        // Check user
        // -------------------------------

        const user =
            await User.findById(userId);


        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found."

            });

        }


        // -------------------------------
        // User must be suspended
        // -------------------------------

        if (user.status !== "suspended") {

            return res.status(400).json({

                success: false,

                message:
                    "Account review is only available for suspended accounts."

            });

        }


        // -------------------------------
        // Check existing pending request
        // -------------------------------

        const existingRequest =
            await SupportRequest.findOne({

                user: userId,

                status: "pending"

            });


        if (existingRequest) {

            return res.status(400).json({

                success: false,

                message:
                    "You already have a pending account review request."

            });

        }


        // -------------------------------
        // Create request
        // -------------------------------

        const supportRequest =
            await SupportRequest.create({

                user: userId,

                message:
                    message.trim(),

                status: "pending",

                read: false

            });


        // -------------------------------
        // Response
        // -------------------------------

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