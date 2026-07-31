import "../../styles/matchingskills.css";

import {
FaCheckCircle
} from "react-icons/fa";


function MatchingSkills({skills=[]}){


return (

<div className="matching-skills">


<h3>

<FaCheckCircle/>

Matched Skills

</h3>


<div className="chips">

{

skills.map(skill=>(

<span 
key={skill}
className="chip success"
>

{skill}

</span>

))

}


</div>


</div>

);


}


export default MatchingSkills;