import "../styles/settings.css";


function Settings(){

return(

<div className="settings-page">


<div className="settings-header">

<h1>Settings</h1>

<p>
Manage your account, career preferences and notifications
</p>

</div>



<div className="settings-layout">



<div className="settings-menu">


<button className="active">
👤 Profile
</button>


<button>
🎯 Career
</button>


<button>
🔔 Notifications
</button>


<button>
🔐 Security
</button>


<button>
💳 Subscription
</button>


</div>





<div className="settings-content">





<div className="setting-card">


<h2>👤 Profile Settings</h2>


<div className="profile-box">

<div className="avatar">
VS
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
value="Vikhnesh Sathyan"
readOnly
/>



<label>
Email
</label>

<input
type="email"
value="vikhnesh@gmail.com"
readOnly
/>



<label>
Bio
</label>


<textarea
value="Full Stack Developer"
readOnly
/>



<button className="save-btn">
Save Changes
</button>


</div>






<div className="setting-card">


<h2>🎯 Career Preferences</h2>


<label>
Target Role
</label>


<input
value="MERN Stack Developer"
readOnly
/>



<label>
Experience Level
</label>


<input
value="Fresher"
readOnly
/>



<label>
Preferred Location
</label>


<input
value="Remote"
readOnly
/>



</div>







<div className="setting-card">


<h2>🔔 Notifications</h2>



<div className="toggle-row">

<span>
Job Match Alerts
</span>


<label className="switch">

<input type="checkbox" defaultChecked/>

<span className="slider"></span>

</label>


</div>





<div className="toggle-row">

<span>
Resume Suggestions
</span>


<label className="switch">

<input type="checkbox" defaultChecked/>

<span className="slider"></span>

</label>


</div>





<div className="toggle-row">

<span>
Interview Reminder
</span>


<label className="switch">

<input type="checkbox"/>

<span className="slider"></span>

</label>


</div>



</div>







<div className="setting-card">


<h2>🔐 Security</h2>


<button className="password-btn">

Change Password

</button>


</div>






<div className="setting-card">


<h2>💳 Subscription</h2>


<p>
Current Plan: Premium
</p>


<button className="upgrade-btn">
Manage Plan
</button>


</div>




</div>


</div>


</div>

)

}


export default Settings;