import "../../styles/suggestions.css";

import { motion } from "framer-motion";

import { FaCheckCircle } from "react-icons/fa";

function SuggestionsCard(){

    const tips=[

        "Add measurable achievements",

        "Mention Docker",

        "Include AWS",

        "Improve Resume Summary",

        "Use stronger action verbs"

    ];

    return(

        <motion.div

            className="suggestions-card"

            initial={{opacity:0,y:30}}

            animate={{opacity:1,y:0}}

            transition={{duration:.7}}

        >

            <h2>

                AI Suggestions

            </h2>

            {

                tips.map((tip,index)=>(

                    <div

                        className="tip"

                        key={index}

                    >

                        <FaCheckCircle/>

                        <span>

                            {tip}

                        </span>

                    </div>

                ))

            }

        </motion.div>

    );

}

export default SuggestionsCard;