import mongoose from "mongoose";


const resumeSchema = new mongoose.Schema(
    {

        // ==========================================
        // USER
        // ==========================================

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        // ==========================================
        // FILE INFORMATION
        // ==========================================

        fileName: {

            type: String,

            required: true

        },


        filePath: {

            type: String,

            default: ""

        },


        // ==========================================
        // ATS SCORE
        // ==========================================

        atsScore: {

            type: Number,

            default: 0

        },


        // ==========================================
        // SKILLS
        // ==========================================

        skills: {

            type: [String],

            default: []

        },


        // ==========================================
        // FULL ANALYSIS
        // ==========================================

        analysis: {

            keywordMatch: {

                type: Number,

                default: 0

            },


            formatting: {

                type: Number,

                default: 0

            },


            readability: {

                type: Number,

                default: 0

            },


            projects: {

                type: Number,

                default: 0

            },


            suggestions: {

                type: [String],

                default: []

            },


            missingSkills: {

                type: [String],

                default: []

            }

        }

    },

    {

        timestamps: true

    }

);


const Resume =
    mongoose.model(
        "Resume",
        resumeSchema
    );


export default Resume;