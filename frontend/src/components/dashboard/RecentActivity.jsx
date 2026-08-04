// import "../../styles/recentactivity.css";

// import { useEffect, useState } from "react";

// import {

//     FaFileAlt,
//     FaMicrophone,
//     FaBriefcase

// } from "react-icons/fa";

// import { getInterviewHistory } from "../../services/interviewHistoryService";
// import { getJobHistory } from "../../services/jobHistoryService";

// function RecentActivity(){

//     const [activities,setActivities]=useState([]);

//     useEffect(()=>{

//         loadActivity();

//     },[]);

//     const loadActivity = async()=>{

//         const token = localStorage.getItem("token");

//         if(!token) return;

//         const interviewData = await getInterviewHistory(token);

//         const jobData = await getJobHistory(token);

//         let list=[];

//         if(interviewData.success){

//             interviewData.history.forEach(item=>{

//                 list.push({

//                     type:"interview",

//                     title:`${item.category} Interview`,

//                     subtitle:`Score ${item.score}/10`,

//                     date:item.createdAt

//                 });

//             });

//         }

//         if(jobData.success){

//             jobData.history.forEach(item=>{

//                 list.push({

//                     type:"job",

//                     title:"Job Match Completed",

//                     subtitle:`${item.matchScore}% Match`,

//                     date:item.createdAt

//                 });

//             });

//         }

//         list.sort(

//             (a,b)=>new Date(b.date)-new Date(a.date)

//         );

//         setActivities(

//             list.slice(0,6)

//         );

//     };

//     const getIcon=(type)=>{

//         switch(type){

//             case "interview":

//                 return <FaMicrophone/>;

//             case "job":

//                 return <FaBriefcase/>;

//             default:

//                 return <FaFileAlt/>;

//         }

//     };

//     return(

//         <div className="activity-card">

//             <div className="activity-header">

//                 <h2>Recent Activity</h2>

//                 <span>Latest Updates</span>

//             </div>

//             {

//                 activities.map((item,index)=>(

//                     <div

//                         key={index}

//                         className="activity-item"

//                     >

//                         <div className="activity-icon">

//                             {getIcon(item.type)}

//                         </div>

//                         <div className="activity-info">

//                             <h3>{item.title}</h3>

//                             <p>{item.subtitle}</p>

//                         </div>

//                     </div>

//                 ))

//             }

//         </div>

//     );

// }

// export default RecentActivity;