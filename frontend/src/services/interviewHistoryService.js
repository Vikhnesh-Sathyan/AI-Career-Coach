const API = "http://localhost:5000/api/interview";



export async function saveInterview(data,token){

    const response = await fetch(

        `${API}/save`,

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json",

                Authorization:`Bearer ${token}`

            },

            body:JSON.stringify(data)

        }

    );

    return await response.json();

}



export async function getInterviewHistory(token){

    const response = await fetch(

        `${API}/history`,

        {

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

    return await response.json();

}