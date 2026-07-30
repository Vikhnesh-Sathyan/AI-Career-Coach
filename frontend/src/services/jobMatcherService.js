const API = "http://localhost:5001";

export async function analyzeJobMatch(resume, jobDescription){

    const formData = new FormData();

    formData.append("resume", resume);

    formData.append("jobDescription", jobDescription);

    const response = await fetch(

        `${API}/job-match`,

        {

            method:"POST",

            body:formData

        }

    );

    return await response.json();

}