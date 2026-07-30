import "../../styles/jobmatcher.css";

import JDInput from "./JDInput";

import JobHero from "./JobHero";


function JobMatcherPage() {

    return (

        <div className="job-page">

            <JobHero />
            <JDInput />

        </div>

    );

}

export default JobMatcherPage;