import "../../styles/interviewsetup.css";

import { useState } from "react";

import { FaPlay } from "react-icons/fa";

function InterviewSetup({ setQuestion, setEvaluation }) {

    const [category, setCategory] = useState("React");

    const [difficulty, setDifficulty] = useState("Easy");

    const handleStart = async () => {

        setEvaluation(null);

        // Temporary demo question
        setQuestion({
            category,
            difficulty,
            question: `Explain one important concept in ${category}.`
        });

    };

    return (

        <div className="interview-setup">

            <h2>Start Mock Interview</h2>

            <div className="setup-grid">

                <div>

                    <label>Category</label>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option>React</option>
                        <option>Angular</option>
                        <option>Node.js</option>
                        <option>MERN Stack</option>
                        <option>Java</option>
                        <option>HR</option>
                    </select>

                </div>

                <div>

                    <label>Difficulty</label>

                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>

                </div>

            </div>

            <button
                className="start-btn"
                onClick={handleStart}
            >

                <FaPlay />

                Start Interview

            </button>

        </div>

    );

}

export default InterviewSetup;