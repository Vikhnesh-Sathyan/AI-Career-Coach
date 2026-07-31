const API = "http://localhost:5000/api/job-match";


// Save Job Match
export async function saveJobMatch(data, token){


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




// Get Match History
export async function getMatchHistory(token){


    const response = await fetch(

        `${API}/history`,

        {

            method:"GET",

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );


    return await response.json();

}