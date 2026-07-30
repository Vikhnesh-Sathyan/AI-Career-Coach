import api from "./api";

export const analyzeJob = async(jobDescription)=>{

    const response = await api.post(

        "/job/analyze",

        {

            jobDescription

        }

    );

    return response.data;

}