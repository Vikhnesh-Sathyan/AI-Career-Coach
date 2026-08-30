import Resume from "../models/Resume.js";


// ==========================================
// GET LATEST ATS ANALYSIS
// ==========================================

export const getLatestATSAnalysis =
    async (req, res) => {

        try {

            const resume =
                await Resume
                    .findOne({
                        user: req.user._id
                    })
                    .sort({
                        createdAt: -1
                    });


            if (!resume) {

                return res.status(404).json({

                    success: false,

                    message:
                        "No resume analysis found."

                });

            }


            return res.status(200).json({

                success: true,

                data: {

                    atsScore:
                        resume.atsScore || 0,

                    skills:
                        resume.skills || [],

                    suggestions:
                        resume.suggestions || [],

                    analysis:
                        resume.analysis || {}

                }

            });

        }

        catch (error) {

            console.error(
                "Get ATS Analysis Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Failed to fetch ATS analysis."

            });

        }

    };