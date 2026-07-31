import mongoose from "mongoose";

const jobMatchSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    jobDescription:{
        type:String,
        required:true
    },

    matchScore:{
        type:Number,
        required:true
    },

    matchedSkills:[
        String
    ],

    missingSkills:[
        String
    ],

    suggestions:[
        String
    ]

},
{
    timestamps:true
});


export default mongoose.model(
    "JobMatch",
    jobMatchSchema
);