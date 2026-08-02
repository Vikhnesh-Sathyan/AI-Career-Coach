import { useEffect, useState } from "react";

import { getInterviewHistory } from "../services/interviewHistoryService";

import "../styles/interviewhistory.css";

function InterviewHistory() {

    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchHistory();

    }, []);

    const fetchHistory = async () => {

        try {

            const token = localStorage.getItem("token");

            const data = await getInterviewHistory(token);

            if (data.success) {

                setHistory(data.history || []);

            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="interview-history">

            <h1>Interview History</h1>

            {

                history.length === 0 ?

                <p>No Interviews Found</p>

                :

                history.map((item) => (

                    <div

                        className="history-card"

                        key={item._id}

                    >

                        <h2>{item.category}</h2>

                        <p><b>Difficulty:</b> {item.difficulty}</p>

                        <p><b>Question:</b> {item.question}</p>

                        <p><b>Score:</b> {item.score}/10</p>

                        <p><b>Feedback:</b> {item.feedback}</p>

                    </div>

                ))

            }

        </div>

    );

}

export default InterviewHistory;