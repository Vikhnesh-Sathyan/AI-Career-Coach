const API =
"http://localhost:5000/api/dashboard";


export async function getDashboardStats(token){


const response = await fetch(

`${API}/stats`,

{
    headers:{
        Authorization:`Bearer ${token}`
    }
}

);


return await response.json();


}