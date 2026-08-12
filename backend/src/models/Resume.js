import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        fileName: {
            type: String,
            required: true
        },

        filePath: {
            type: String,
            default: ""
        },

        atsScore: {
            type: Number,
            default: 0
        },

        skills: {
            type: [String],
            default: []
        },

        analysis: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }
    },
    {
        timestamps: true
    }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;