import "../../styles/skillscard.css";

import { motion } from "framer-motion";

function SkillsCard(){

    const skills=[

        "React",

        "Node.js",

        "MongoDB",

        "Express",

        "JavaScript",

        "HTML",

        "CSS"

    ];

    return(

        <motion.div

            className="skills-card"

            initial={{opacity:0,y:30}}

            animate={{opacity:1,y:0}}

            transition={{duration:.6}}

        >

            <h2>

                Skills Found

            </h2>

            <div className="skills-grid">

                {

                    skills.map(skill=>(

                        <span key={skill}>

                            {skill}

                        </span>

                    ))

                }

            </div>

        </motion.div>

    );

}

export default SkillsCard;