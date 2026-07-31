import "../../styles/matchresult.css";

import { motion } from "framer-motion";

import MatchScore from "./MatchScore";
import MatchingSkills from "./MatchingSkills";
import MissingSkills from "./MissingSkills";
import AIRecommendation from "./AIRecommendation";


function MatchResult({ analysis }) {


    return (

        <motion.div

            className="match-result"

            initial={{
                opacity:0,
                y:40
            }}

            animate={{
                opacity:1,
                y:0
            }}

        >

            <MatchScore 
                score={analysis.matchScore}
            />


            <div className="match-grid">


                <MatchingSkills

                    skills={analysis.matchedSkills}

                />


                <MissingSkills

                    skills={analysis.missingSkills}

                />


            </div>


            <AIRecommendation

                suggestions={analysis.suggestions}

            />


        </motion.div>

    );

}


export default MatchResult;