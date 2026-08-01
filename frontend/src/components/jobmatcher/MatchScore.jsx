import "../../styles/matchscore.css";

import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";


function MatchScore({score}) {

return (

<div className="match-score-card">


<div className="score-container">

<CircularProgressbar

value={score}

text={`${score}%`}

styles={buildStyles({

textColor:"#ffffff",

textSize:"24px",

pathColor:"#22C55E",

trailColor:"#1E293B",

pathTransitionDuration:0.8

})}

/>

</div>


<div className="score-info">


<h1>
Resume Match Score
</h1>


<p>

{

score >= 85

?
"🚀 Excellent Match"

:

score >=70

?
"✨ Good Match"

:

"⚡ Needs Improvement"

}

</p>


<span>
AI-powered resume compatibility analysis
</span>


</div>


</div>

);

}


export default MatchScore;