import "../../styles/matchscore.css";

import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";


function MatchScore({score}){


return (

<div className="match-score">


<div className="score-circle">


<CircularProgressbar

value={score}

text={`${score}%`}

styles={buildStyles({

textColor:"#fff",

pathColor:"#3B82F6",

trailColor:"#334155"

})}

/>


</div>


<h2>
Resume Match Score
</h2>


<p>

{

score >= 85

?
"Excellent Match"

:

score >=70

?
"Good Match"

:

"Needs Improvement"

}

</p>


</div>

);


}


export default MatchScore;