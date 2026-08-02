import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(

    {

        userId:{

            type:mongoose.Schema.Types.ObjectId,

            ref:"User",

            required:true

        },

        category:{

            type:String,

            required:true

        },

        difficulty:{

            type:String,

            required:true

        },

        question:{

            type:String,

            required:true

        },

        answer:{

            type:String,

            required:true

        },

        score:{

            type:Number,

            required:true

        },

        feedback:{

            type:String,

        }

    },

    {

        timestamps:true

    }

);

export default mongoose.model(

    "Interview",

    interviewSchema

);