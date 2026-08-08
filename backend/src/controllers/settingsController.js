import User from "../models/User.js";



// GET SETTINGS

export const getSettings = async(req,res)=>{


try{


const user = await User.findById(req.user.id)
.select("-password");


res.json({

success:true,
user

});


}
catch(error){

res.status(500).json({

success:false,
message:error.message

});

}


};





// UPDATE PROFILE


export const updateProfile = async(req,res)=>{


try{


const user = await User.findByIdAndUpdate(

req.user.id,

{

name:req.body.name,

bio:req.body.bio

},

{
new:true
}


).select("-password");



res.json({

success:true,
user

});



}
catch(error){

res.status(500).json({

success:false,
message:error.message

});

}



};





// UPDATE CAREER


export const updateCareer = async(req,res)=>{


try{


const user = await User.findByIdAndUpdate(

req.user.id,

{

careerPreferences:req.body

},

{
new:true
}


);



res.json({

success:true,
user

});


}
catch(error){

res.status(500).json({

success:false,
message:error.message

});


}


};





// UPDATE NOTIFICATIONS


export const updateNotifications = async(req,res)=>{


try{


const user = await User.findByIdAndUpdate(

req.user.id,

{

notifications:req.body

},

{
new:true
}


);



res.json({

success:true,
user

});


}
catch(error){

res.status(500).json({

success:false,
message:error.message

});


}



};





// UPDATE SUBSCRIPTION


export const updateSubscription = async(req,res)=>{


try{


const { plan } = req.body;

const allowedPlans = ["Free", "Premium"];

if(!allowedPlans.includes(plan)){

return res.status(400).json({

success:false,
message:"Invalid plan. Choose Free or Premium."

});

}



const user = await User.findByIdAndUpdate(

req.user.id,

{

subscription:{

plan,

status:"active"

}

},

{
new:true
}


).select("-password");



res.json({

success:true,
user

});


}
catch(error){

res.status(500).json({

success:false,
message:error.message

});


}



};