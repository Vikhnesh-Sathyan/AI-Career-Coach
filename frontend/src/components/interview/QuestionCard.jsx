import "../../styles/questioncard.css";

import { motion } from "framer-motion";

import { FaRobot } from "react-icons/fa";

function QuestionCard({ question }) {

    return (

        <motion.div

            className="question-card"

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

        >

            <div className="question-header">

                <FaRobot />

                <h2>Interview Question</h2>

            </div>

            <p>

                {question.question}

            </p>

        </motion.div>

    );

}

export default QuestionCard;