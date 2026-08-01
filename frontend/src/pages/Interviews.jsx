import "../styles/interviewpage.css";

import { useState } from "react";

import InterviewHero from "../components/interview/InterviewHero";
import InterviewSetup from "../components/interview/InterviewSetup";
import QuestionCard from "../components/interview/QuestionCard";
import AnswerBox from "../components/interview/AnswerBox";
import EvaluationCard from "../components/interview/EvaluationCard";

function Interviews(){

    const [question,setQuestion]=useState(null);

    const [evaluation,setEvaluation]=useState(null);

    return(

        <div className="interview-page">

            <InterviewHero/>

            <InterviewSetup

                setQuestion={setQuestion}

                setEvaluation={setEvaluation}

            />

            {

                question &&

                <>

                    <QuestionCard

                        question={question}

                    />

                    <AnswerBox

                        question={question}

                        setEvaluation={setEvaluation}

                    />
                    {

                        evaluation &&

                            <EvaluationCard

                            result={evaluation}

                    />

}

                </>

            }

        </div>

    );

}

export default Interviews;