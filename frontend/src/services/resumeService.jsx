import axios from "axios";

const API = "http://localhost:5000/api/resume";

export const uploadResume = async (formData) => {

    const response = await axios.post(

        `${API}/upload`,

        formData,

        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

    );

    return response.data;

};