import axios from "axios";

export const analyzeJob = async (req, res) => {

    try {

        const response = await axios.post(

            "http://127.0.0.1:5001/job-match",

            {

                jobDescription: req.body.jobDescription

            }

        );

        res.json(response.data);

    }

    catch (error) {

        res.status(500).json({

            success:false,

            message:"Python server error"

        });

    }

};