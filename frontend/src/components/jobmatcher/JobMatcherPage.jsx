import "../../styles/jobmatcher.css";

import { useState } from "react";

import JDInput from "./JDInput";

import JobHero from "./JobHero";

import MatchResult from "./MatchResult";

import LoadingMatch from "./LoadingMatch";



function JobMatcherPage(){


const [result,setResult]=useState(null);

const [loading,setLoading]=useState(false);



return(

<div className="job-page">


<JobHero />



<JDInput

setResult={setResult}

setLoading={setLoading}

loading={loading}

/>



{

loading && (

<LoadingMatch/>

)

}


{

result && result.success && (

<MatchResult

analysis={result}

/>

)

}



</div>


)


}


export default JobMatcherPage;