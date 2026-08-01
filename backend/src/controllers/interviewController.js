import Interview from "../models/Interview.js";



// Save Interview

export const saveInterview = async(req,res)=>{

    try{

        const interview = await Interview.create({

            userId:req.user.id,

            category:req.body.category,

            difficulty:req.body.difficulty,

            question:req.body.question,

            answer:req.body.answer,

            score:req.body.score,

            feedback:req.body.feedback

        });

        res.status(201).json({

            success:true,

            message:"Interview saved successfully",

            data:interview

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};




// History

export const getInterviewHistory = async(req,res)=>{

    try{

        const history = await Interview.find({

            userId:req.user.id

        }).sort({

            createdAt:-1

        });

        res.json({

            success:true,

            history

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

// Generate Interview Question
export const generateQuestion = async (req, res) => {

    try {

        const { category, difficulty } = req.body;

        res.json({

            success: true,

            category,

            difficulty,

            question: `Explain one important concept in ${category}.`

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// Evaluate Interview Answer
export const evaluateAnswer = async (req, res) => {

    try {

        const { answer } = req.body;

        let score = 5;
        let feedback = "Your answer is too short.";

        if (answer.length > 100) {

            score = 8;
            feedback = "Good explanation. Add more practical examples.";

        }

        if (answer.length > 250) {

            score = 10;
            feedback = "Excellent answer with detailed explanation.";

        }

        res.json({

            success: true,

            score,

            feedback

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};