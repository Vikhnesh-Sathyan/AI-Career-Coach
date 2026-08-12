import axios from "axios";
import fs from "fs";
import FormData from "form-data";

import Resume from "../models/Resume.js";

// ==========================================
// UPLOAD + ANALYZE RESUME
// ==========================================

export const uploadResume = async (req, res) => {

    try {

        // ==========================================
        // CHECK FILE
        // ==========================================

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "Please upload a PDF"

            });

        }


        // ==========================================
        // SEND RESUME TO PYTHON
        // ==========================================

        const formData = new FormData();

        formData.append(
            "resume",
            fs.createReadStream(req.file.path)
        );


        const pythonResponse = await axios.post(

            "http://127.0.0.1:5001/analyze",

            formData,

            {
                headers:
                    formData.getHeaders()
            }

        );


        // ==========================================
        // PYTHON ANALYSIS RESULT
        // ==========================================

        const analysis =
            pythonResponse.data;


        console.log(
            "Python Resume Analysis:",
            analysis
        );


        // ==========================================
        // GET ATS SCORE
        // ==========================================

        const atsScore =
            analysis.atsScore ||
            analysis.ats_score ||
            analysis.score ||
            0;


        // ==========================================
        // GET SKILLS
        // ==========================================

        const skills =
            analysis.skills || [];


        // ==========================================
        // SAVE RESUME TO MONGODB
        // ==========================================

        const resume =
            await Resume.create({

                user: req.user._id,

                fileName:
                    req.file.originalname,

                filePath:
                    req.file.path,

                atsScore:
                    atsScore,

                skills:
                    skills,

                analysis:
                    analysis

            });


        console.log(
            "Resume saved:",
            resume._id
        );


        // ==========================================
        // SEND RESPONSE TO FRONTEND
        // ==========================================

        res.status(200).json({

            success: true,

            ...analysis,

            resumeId:
                resume._id

        });

    }

    catch (error) {

        console.error(
            "Resume Upload Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                error.response?.data?.message ||
                error.message ||
                "Resume analysis failed"

        });

    }

};