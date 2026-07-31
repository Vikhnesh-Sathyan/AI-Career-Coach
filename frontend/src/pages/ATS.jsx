import "../styles/atspage.css";

import ATSCard from "../components/resume/ATSCard";

function ATS() {

    const analysis = {

        atsScore:94

    };

    return (

        <div className="ats-page">

            <ATSCard analysis={analysis}/>

        </div>

    );

}

export default ATS;