import "../styles/interviewhistory.css";

import { useEffect, useState } from "react";

import { getInterviewHistory } from "../services/interviewHistoryService";

import {
    FaHistory,
    FaStar,
    FaCode
} from "react-icons/fa";

function InterviewHistory(){

    const [history,setHistory]=useState([]);


    useEffect(()=>{

        const fetchHistory = async()=>{

            const token = localStorage.getItem("token");


            if(token){

                const data = await getInterviewHistory(token);


                if(data.success){

                    setHistory(data.history);

                }

            }

        };


        fetchHistory();


    },[]);



    return(

        <div className="history-section">


            <div className="history-title">

                <FaHistory/>

                <h2>
                    Interview History
                </h2>

            </div>



            {

                history.length === 0 ?

                (

                    <p className="empty-history">
                        No interviews completed yet.
                    </p>

                )

                :

                history.map((item)=>(


                    <div
                    className="history-card"
                    key={item._id}
                    >


                        <div className="history-header">


                            <h3>

                                <FaCode/>

                                {item.category}

                            </h3>


                            <span>

                                Score {item.score}/10

                            </span>


                        </div>



                        <p className="difficulty">

                            Difficulty: {item.difficulty}

                        </p>



                        <div className="history-question">

                            <strong>
                                Question
                            </strong>

                            <p>
                                {item.question}
                            </p>

                        </div>



                        <div className="history-feedback">

                            <FaStar/>

                            <p>
                                {item.feedback}
                            </p>

                        </div>



                    </div>


                ))

            }


        </div>

    );

}


export default InterviewHistory;