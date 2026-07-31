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


        console.log("History Response:", data);



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

            <h2>
                Loading history...
            </h2>

        );

    }



    return (

        <div className="history-page">


            <h1>
                Job Match History
            </h1>



            {
                !history || history.length === 0 ?


                <div className="empty-history">

                    No Match History Found

                </div>


                :


                history.map((item)=>(


                    <div 
                    className="history-card"
                    key={item._id}
                    >


                        <h2>

                            {item.jobDescription}

                        </h2>


                        <h3>

                            Match Score:

                            <span>
                                {item.matchScore}%

                            </span>

                        </h3>



                        <div>


                            {
                                item.matchedSkills.map(skill=>(

                                    <span 
                                    className="skill"
                                    key={skill}
                                    >

                                    {skill}

                                    </span>

                                ))
                            }


                        </div>


                    </div>


                ))

            }



        </div>

    );


}


export default MatchHistory;