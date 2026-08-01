const API = "http://localhost:5000/api/interview";

export async function generateQuestion(category, difficulty){

    const response = await fetch(

        `${API}/question`,

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                category,

                difficulty

            })

        }

    );

    return await response.json();

}



export async function evaluateAnswer(question, answer){

    const response = await fetch(

        `${API}/evaluate`,

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                question,

                answer

            })

        }

    );

    return await response.json();

}