import { useEffect, useState } from "react";

import { getMatchHistory } from "../services/jobHistoryService";

import "../styles/matchhistory.css";


function MatchHistory(){

    const [history,setHistory] = useState([]);

    const [loading,setLoading] = useState(true);



    useEffect(()=>{

        fetchHistory();

    },[]);



    const fetchHistory = async()=>{

        try{

            const token = localStorage.getItem("token");

            const data = await getMatchHistory(token);


            console.log("History Response:",data);


            if(data.success){

                setHistory(data.data || []);

            }
            else{

                setHistory([]);

            }


        }
        catch(error){

            console.log(error);

            setHistory([]);

        }
        finally{

            setLoading(false);

        }

    };



    if(loading){

        return (

            <div className="history-loading">

                Loading AI Match Reports...

            </div>

        );

    }



    return (

        <div className="history-page">


            <div className="history-header">


                <p className="history-tag">

                    AI ANALYSIS REPORTS

                </p>


                <h1>

                    Job Match History

                </h1>


                <span>

                    Track your previous resume compatibility analysis

                </span>


            </div>





            {

            history.length === 0 ?


            (

                <div className="empty-history">

                    <h2>

                    No Match Reports Found

                    </h2>

                    <p>

                    Analyze a job description to create your first AI report.

                    </p>

                </div>

            )


            :


            (

            <div className="history-list">


            {

            history.map((item)=>(


                <div 
                className="history-card"
                key={item._id}
                >



                    <div className="card-top">


                        <div>


                            <p className="report-label">

                                JOB MATCH REPORT

                            </p>


                            <h2>

                            {
                            item.jobDescription.length > 80
                            ?
                            item.jobDescription.substring(0,80)+"..."
                            :
                            item.jobDescription
                            }

                            </h2>


                        </div>




                        <div className="score-badge">


                            {item.matchScore}%


                        </div>



                    </div>




                    <div className="match-status">


                        <span></span>

                        {

                        item.matchScore >=85

                        ?

                        "Excellent Match"

                        :

                        item.matchScore >=70

                        ?

                        "Good Match"

                        :

                        "Needs Improvement"

                        }


                    </div>






                    <div className="skills-section">


                        <h3>

                        Matched Skills

                        </h3>



                        <div className="skills">


                        {

                        item.matchedSkills.map(skill=>(


                            <span
                            key={skill}
                            className="skill"
                            >

                            ⚡ {skill}

                            </span>


                        ))

                        }


                        </div>


                    </div>




                    <div className="card-footer">


                        <span>

                        🤖 AI Resume Analyzer

                        </span>


                        <button>

                        View Report →

                        </button>


                    </div>



                </div>


            ))

            }


            </div>

            )


            }



        </div>

    );

}


export default MatchHistory;