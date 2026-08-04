import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(

    {

        userId:{

            type:mongoose.Schema.Types.ObjectId,

            ref:"User",

            required:true

        },

        company:{

            type:String,

            required:true,

            trim:true

        },

        role:{

            type:String,

            required:true,

            trim:true

        },

        location:{

            type:String,

            default:""

        },

        jobUrl:{

            type:String,

            default:""

        },

        salary:{

            type:String,

            default:""

        },

        status:{

            type:String,

            enum:[

                "Applied",

                "Shortlisted",

                "Assessment",

                "Interview",

                "Offer",

                "Rejected",

                "Accepted"

            ],

            default:"Applied"

        },

        priority:{

            type:String,

            enum:[

                "High",

                "Medium",

                "Low"

            ],

            default:"Medium"

        },

        appliedDate:{

            type:Date,

            default:Date.now

        },

        interviewDate:{

            type:Date

        },

        notes:{

            type:String,

            default:""

        }

    },

    {

        timestamps:true

    }

);

export default mongoose.model(

    "JobApplication",

    jobApplicationSchema

);