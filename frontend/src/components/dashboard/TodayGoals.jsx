import "../../styles/todaygoals.css";

import { motion } from "framer-motion";
import { useState } from "react";

function TodayGoals() {

    const [goals, setGoals] = useState([

        {
            text: "Upload Resume",
            done: true
        },

        {
            text: "Improve ATS Score",
            done: false
        },

        {
            text: "Apply for 2 Jobs",
            done: false
        },

        {
            text: "Complete Mock Interview",
            done: false
        }

    ]);

    const toggleGoal = (index) => {

        const updated = [...goals];

        updated[index].done = !updated[index].done;

        setGoals(updated);

    };

    return (

        <motion.div

            className="goals-card"

            initial={{ opacity:0,x:-40 }}

            animate={{ opacity:1,x:0 }}

            transition={{ duration:.6 }}

        >

            <h2>

                🎯 Today's Goals

            </h2>

            {

                goals.map((goal,index)=>(

                    <label

                        className="goal-item"

                        key={index}

                    >

                        <input

                            type="checkbox"

                            checked={goal.done}

                            onChange={()=>toggleGoal(index)}

                        />

                        <span>

                            {goal.text}

                        </span>

                    </label>

                ))

            }

        </motion.div>

    );

}

export default TodayGoals;