import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export const uploadResume = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,
                message: "Please upload a PDF"

            });

        }

        const formData = new FormData();

        formData.append(

            "resume",

            fs.createReadStream(req.file.path)

        );

        const pythonResponse = await axios.post(

            "http://127.0.0.1:5001/analyze",

            formData,

            {

                headers: formData.getHeaders()

            }

        );

        res.json({

            success: true,

            filename: req.file.filename,

            extractedText: pythonResponse.data.text

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};