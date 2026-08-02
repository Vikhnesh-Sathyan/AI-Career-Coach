import "../../styles/answerbox.css";

import { useState } from "react";

import { FaPaperPlane } from "react-icons/fa";

import { evaluateAnswer } from "../../services/interviewService";

import { saveInterview } from "../../services/interviewHistoryService";

function AnswerBox({ question, setEvaluation }) {

    const [answer, setAnswer] = useState("");

    const handleSubmit = async () => {

        if (!answer.trim()) {

            alert("Please write your answer.");

            return;

        }

        try {

            const data = await evaluateAnswer(

                question.question,

                answer

            );

           if (data.success) {

    setEvaluation(data);

    const token = localStorage.getItem("token");

    if (token) {

        const saveData = await saveInterview(

            {

                category: question.category,

                difficulty: question.difficulty,

                question: question.question,

                answer,

                score: data.score,

                feedback: data.feedback

            },

            token

        );

        console.log("Interview Saved:", saveData);

    }

} else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

            alert("Failed to evaluate answer.");

        }

    };

    return (

        <div className="answer-card">

            <h2>Your Answer</h2>

            <textarea

                value={answer}

                onChange={(e) => setAnswer(e.target.value)}

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