export const uploadResume = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,
                message: "Please upload a PDF resume"

            });

        }

        res.status(200).json({

            success: true,

            message: "Resume uploaded successfully",

            file: {

                filename: req.file.filename,

                originalName: req.file.originalname,

                size: req.file.size

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};