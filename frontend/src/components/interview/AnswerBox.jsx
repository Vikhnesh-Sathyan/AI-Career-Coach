import "../../styles/answerbox.css";

import { useState } from "react";

import { FaPaperPlane } from "react-icons/fa";

function AnswerBox({ question, setEvaluation }) {

    const [answer, setAnswer] = useState("");

    const handleSubmit = () => {

        if (!answer.trim()) {

            alert("Please write your answer.");

            return;

        }

        // Temporary demo evaluation

        setEvaluation({

            score: 8,

            feedback: "Good explanation. Add more real-world examples to improve your answer."

        });

    };

    return (

        <div className="answer-card">

            <h2>Your Answer</h2>

            <textarea

                value={answer}

                onChange={(e)=>setAnswer(e.target.value)}

                placeholder="Type your answer here..."

            />

            <button

                className="submit-answer"

                onClick={handleSubmit}

            >

                <FaPaperPlane />

                Submit Answer

            </button>

        </div>

    );

}

export default AnswerBox;