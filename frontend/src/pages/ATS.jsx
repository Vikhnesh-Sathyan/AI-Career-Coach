import "../styles/atspage.css";

import ATSCard from "../components/ats/ATSCard";

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