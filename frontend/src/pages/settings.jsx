import "../styles/settings.css";

import { useEffect, useState } from "react";

import {
    getSettings,
    updateProfile
} from "../services/settingsService";


function Settings(){


const [settings,setSettings]=useState(null);


const [activeTab,setActiveTab]=useState("profile");


const [formData,setFormData]=useState({

    name:"",
    bio:""

});



useEffect(()=>{


const loadSettings=async()=>{


try{


const token=localStorage.getItem("token");


if(!token){
    return;
}



const res=await getSettings(token);



if(res.data.success){


setSettings(res.data.user);



setFormData({

name:res.data.user.name || "",

bio:res.data.user.bio || ""

});


}



}
catch(error){

console.log(error);

}


};


loadSettings();


},[]);






const saveProfile=async()=>{


try{


const token=localStorage.getItem("token");


const res=await updateProfile(

formData,

token

);



if(res.data.success){


setSettings(res.data.user);


alert("Profile Updated Successfully");


}



}
catch(error){

console.log(error);

}


};






if(!settings){


return(

<div className="loading">

Loading settings...

</div>

);


}







return(


<div className="settings-page">





<div className="settings-header">


<h1>
Settings
</h1>


<p>
Manage your account, career preferences and notifications
</p>


</div>








<div className="settings-layout">








<div className="settings-menu">



<button

className={
activeTab==="profile" ? "active" : ""
}

onClick={()=>setActiveTab("profile")}

>

👤 Profile

</button>





<button

className={
activeTab==="career" ? "active" : ""
}

onClick={()=>setActiveTab("career")}

>

🎯 Career

</button>





<button

className={
activeTab==="notifications" ? "active" : ""
}

onClick={()=>setActiveTab("notifications")}

>

🔔 Notifications

</button>





<button

className={
activeTab==="security" ? "active" : ""
}

onClick={()=>setActiveTab("security")}

>

🔐 Security

</button>





<button

className={
activeTab==="subscription" ? "active" : ""
}

onClick={()=>setActiveTab("subscription")}

>

💳 Subscription

</button>




</div>









<div className="settings-content">











{/* PROFILE */}



{

activeTab==="profile" && (



<div className="setting-card">



<h2>
👤 Profile Settings
</h2>





<div className="profile-box">



<div className="avatar">


{
settings?.name
?.split(" ")
.map(item=>item[0])
.join("")
}



</div>



<button>

Change Photo

</button>



</div>







<label>
Full Name
</label>



<input

type="text"

value={formData.name}

onChange={(e)=>

setFormData({

...formData,

name:e.target.value

})

}

/>









<label>
Email
</label>



<input

type="email"

value={settings.email}

readOnly

/>









<label>
Bio
</label>



<textarea

value={formData.bio}

onChange={(e)=>

setFormData({

...formData,

bio:e.target.value

})

}

/>








<button

className="save-btn"

onClick={saveProfile}

>

Save Changes

</button>





</div>


)

}














{/* CAREER */}



{

activeTab==="career" && (



<div className="setting-card">


<h2>
🎯 Career Preferences
</h2>






<label>
Target Role
</label>



<input

value={
settings?.careerPreferences?.targetRole || ""
}

readOnly

/>







<label>
Experience Level
</label>



<input

value={
settings?.careerPreferences?.experience || ""
}

readOnly

/>







<label>
Preferred Location
</label>



<input

value={
settings?.careerPreferences?.location || ""
}

readOnly

/>





</div>



)

}













{/* NOTIFICATIONS */}



{

activeTab==="notifications" && (



<div className="setting-card">


<h2>
🔔 Notifications
</h2>







<div className="toggle-row">


<span>
Job Match Alerts
</span>




<label className="switch">


<input

type="checkbox"

checked={
settings?.notifications?.jobMatchAlerts || false
}

onChange={()=>{}}

/>



<span className="slider"></span>



</label>



</div>









<div className="toggle-row">


<span>
Resume Suggestions
</span>




<label className="switch">


<input

type="checkbox"

checked={
settings?.notifications?.resumeSuggestions || false
}

onChange={()=>{}}

/>



<span className="slider"></span>



</label>



</div>









<div className="toggle-row">


<span>
Interview Reminder
</span>




<label className="switch">


<input

type="checkbox"

checked={
settings?.notifications?.interviewReminder || false
}

onChange={()=>{}}

/>



<span className="slider"></span>



</label>



</div>





</div>


)

}














{/* SECURITY */}



{

activeTab==="security" && (



<div className="setting-card">


<h2>
🔐 Security
</h2>




<button className="password-btn">

Change Password

</button>




</div>


)

}














{/* SUBSCRIPTION */}



{

activeTab==="subscription" && (



<div className="setting-card">


<h2>
💳 Subscription
</h2>





<p>

Current Plan:

{" "}

{
settings?.subscription?.plan || "Free"
}


</p>







<button className="upgrade-btn">

Manage Plan

</button>





</div>


)

}









</div>







</div>






</div>


);


}



export default Settings;