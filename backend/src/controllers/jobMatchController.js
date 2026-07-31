import JobMatch from "../models/JobMatch.js";


// Save Job Match
export const saveJobMatch = async (req, res) => {

    try {

        const {
            jobDescription,
            matchScore,
            matchedSkills,
            missingSkills,
            suggestions
        } = req.body;


        const newMatch = await JobMatch.create({

            userId: req.user.id,

            jobDescription,

            matchScore,

            matchedSkills,

            missingSkills,

            suggestions

        });


        res.status(201).json({

            success: true,

            message: "Job match saved successfully",

            data: newMatch

        });


    } catch(error) {

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



// Get Match History
export const getMatchHistory = async (req, res) => {

    try {

        const history = await JobMatch
            .find({
                userId:req.user.id
            })
            .sort({
                createdAt:-1
            });


        res.json({

            success:true,

            data:history

        });


    } catch(error) {

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};