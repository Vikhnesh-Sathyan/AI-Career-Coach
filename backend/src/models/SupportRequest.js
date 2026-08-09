import mongoose from "mongoose";

const supportRequestSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        message: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        },

        read: {
            type: Boolean,
            default: false
        },

        adminResponse: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const SupportRequest =
    mongoose.model(
        "SupportRequest",
        supportRequestSchema
    );

export default SupportRequest;