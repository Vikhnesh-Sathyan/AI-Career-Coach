import axios from "axios";

const API = "http://localhost:5000/api/resume";

export const uploadResume = async (formData) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        `${API}/upload`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};