import Interview from "../models/Interview.js";
import JobMatch from "../models/JobMatch.js";


// Dashboard Statistics

export const getDashboardStats = async(req,res)=>{

    try{

        const userId = req.user.id;


        // Latest Job Match

        const latestMatch = await JobMatch.findOne({
            userId
        })
        .sort({
            createdAt:-1
        });



        // Total Job Matches

        const jobMatches = await JobMatch.countDocuments({
            userId
        });



        // Interview Count

        const interviews = await Interview.countDocuments({
            userId
        });



        // Unique skills from matched skills

        const matches = await JobMatch.find({
            userId
        });



        let skills = [];


        matches.forEach(match=>{

            skills.push(
                ...match.matchedSkills
            );

        });



        skills = [
            ...new Set(skills)
        ];



        res.json({

            success:true,

            stats:{

                atsScore:
                latestMatch?.matchScore || 0,


                applications:
                jobMatches,


                interviews,


                skills:
                skills.length

            }

        });


    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};