const API = "http://localhost:5000/api/application";


// Add Application
export async function addApplication(data, token) {

    const response = await fetch(

        `${API}/add`,

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify(data)

        }

    );

    return await response.json();

}


// Get All Applications
export async function getApplications(token) {

    const response = await fetch(

        `${API}`,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return await response.json();

}


// Get Single Application
export async function getApplication(id, token) {

    const response = await fetch(

        `${API}/${id}`,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return await response.json();

}


// Update Application
export async function updateApplication(id, data, token) {

    const response = await fetch(

        `${API}/update/${id}`,

        {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify(data)

        }

    );

    return await response.json();

}


// Delete Application
export async function deleteApplication(id, token) {

    const response = await fetch(

        `${API}/delete/${id}`,

        {

            method: "DELETE",

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return await response.json();

}


// Dashboard Stats
export async function getApplicationStats(token) {

    const response = await fetch(

        `${API}/stats`,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return await response.json();

}