import "../../styles/recentinterviews.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getInterviewHistory } from "../../services/interviewHistoryService";


function RecentInterviews() {

    const [history, setHistory] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {

        loadHistory();

    }, []);



    const loadHistory = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) return;


            const data = await getInterviewHistory(token);


            if(data.success){

                setHistory(data.history.slice(0,5));

            }


        } catch(error){

            console.log(error);

        }

    };



    return (

        <div className="recent-card">


            <div className="recent-header">

                <h2>Recent Interviews</h2>


                <button 
                    className="view-btn"
                    onClick={() => navigate("/interview-history")}
                >
                    View All
                </button>


            </div>



            {
                history.length === 0 ?

                (

                    <div className="empty-state">

                        No interviews completed yet.

                    </div>

                )

                :

                history.map((item)=>(


                    <div 
                        className="recent-item"
                        key={item._id}
                    >


                        <div>

                            <h3>{item.category}</h3>

                            <p>{item.difficulty}</p>

                        </div>



                        <div className="score-badge">

                            {item.score}/10

                        </div>


                    </div>


                ))

            }


        </div>

    );

}


export default RecentInterviews;