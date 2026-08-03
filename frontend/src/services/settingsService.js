import axios from "axios";


const API="http://localhost:5000/api/settings";



export const getSettings=(token)=>{


return axios.get(API,{

headers:{
Authorization:`Bearer ${token}`
}

});


};





export const updateProfile=(data,token)=>{


return axios.put(

`${API}/profile`,

data,

{

headers:{
Authorization:`Bearer ${token}`
}

}

);


};




export const updateCareer=(data,token)=>{


return axios.put(

`${API}/career`,

data,

{

headers:{
Authorization:`Bearer ${token}`
}

}

);


};





export const updateNotifications=(data,token)=>{


return axios.put(

`${API}/notifications`,

data,

{

headers:{
Authorization:`Bearer ${token}`
}

}

);


};