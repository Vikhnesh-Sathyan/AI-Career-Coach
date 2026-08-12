import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        company: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            default: ""
        },

        employmentType: {
            type: String,
            enum: [
                "Full-time",
                "Part-time",
                "Internship",
                "Contract"
            ],
            default: "Full-time"
        },

        salary: {
            type: String,
            default: ""
        },

        description: {
            type: String,
            required: true
        },

        skills: {
            type: [String],
            default: []
        },

        experience: {
            type: String,
            default: "Fresher"
        },

        applicationDeadline: {
            type: Date
        },

        jobUrl: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "Open",
                "Closed"
            ],
            default: "Open"
        },

        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;