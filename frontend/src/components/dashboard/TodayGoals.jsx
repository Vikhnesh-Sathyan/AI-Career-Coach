import "../../styles/todaygoals.css";

import { motion } from "framer-motion";
import { useState } from "react";


function TodayGoals() {


    const [goals, setGoals] = useState([

        {
            text:"Upload Resume",
            done:true
        },

        {
            text:"Improve ATS Score",
            done:false
        },

        {
            text:"Apply for 2 Jobs",
            done:false
        },

        {
            text:"Complete Mock Interview",
            done:false
        }

    ]);



    const toggleGoal = (index)=>{


        const updatedGoals = [...goals];


        updatedGoals[index].done =
        !updatedGoals[index].done;


        setGoals(updatedGoals);


    };



    const completedGoals = goals.filter(
        goal => goal.done
    ).length;



    const progress = Math.round(
        (completedGoals / goals.length) * 100
    );



    return (


        <motion.div

            className="goals-card"

            initial={{
                opacity:0,
                x:-40
            }}

            animate={{
                opacity:1,
                x:0
            }}

            transition={{
                duration:.6
            }}

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



<div className="goal-summary">


    <div className="summary-box">

        <span>
            ✅
        </span>

        <div>
            <h3>
                {completedGoals}
            </h3>

            <p>
                Completed
            </p>
        </div>

    </div>



    <div className="summary-box">

        <span>
            🚀
        </span>

        <div>
            <h3>
                {goals.length - completedGoals}
            </h3>

            <p>
                Remaining
            </p>
        </div>

    </div>



    <div className="goal-message">

        {
            progress === 100
            ?
            "🎉 All goals completed!"
            :
            "🔥 Keep pushing your career forward!"
        }

    </div>


</div>



        </motion.div>


    );

}


export default TodayGoals;