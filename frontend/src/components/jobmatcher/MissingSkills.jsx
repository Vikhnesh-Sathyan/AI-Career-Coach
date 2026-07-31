import "../../styles/missingskills.css";

import {
FaTimesCircle
} from "react-icons/fa";


function MissingSkills({skills=[]}){


return (

<div className="missing-skills">


<h3>

<FaTimesCircle/>

Missing Skills

</h3>


<div className="chips">


{

skills.length === 0 ? (

<p>
No missing skills 🎉
</p>

)

:

skills.map(skill=>(

<span

key={skill}

className="chip danger"

>

{skill}

</span>

))


}


</div>


</div>

);


}


export default MissingSkills;