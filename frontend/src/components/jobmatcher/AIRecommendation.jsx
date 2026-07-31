import "../../styles/airecommendation.css";

import {
FaRobot
} from "react-icons/fa";


function AIRecommendation({suggestions=[]}){


return (

<div className="ai-recommendation">


<h3>

<FaRobot/>

AI Suggestions

</h3>


{

suggestions.map((item,index)=>(

<p key={index}>

• {item}

</p>

))

}


</div>

);


}


export default AIRecommendation;