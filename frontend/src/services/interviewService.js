const API = "http://localhost:5001";

export async function evaluateAnswer(question, answer) {

    const response = await fetch(

        `${API}/interview-evaluate`,

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                question,
                answer

            })

        }

    );

    return await response.json();

}