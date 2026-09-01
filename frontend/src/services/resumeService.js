import axios from "axios";


const API =
    "http://localhost:5000/api/resume";


// ==========================================
// UPLOAD RESUME
// ==========================================

export const uploadResume =
    async (formData) => {

        const token =
            localStorage.getItem("token");


        const response =
            await axios.post(

                `${API}/upload`,

                formData,

                {
                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }

            );


        return response.data;

    };


// ==========================================
// GET LATEST RESUME ANALYSIS
// ==========================================

export const getLatestResumeAnalysis =
    async () => {

        const token =
            localStorage.getItem("token");


        const response =
            await axios.get(

                `${API}/latest`,

                {
                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }

            );


        return response.data;

    };