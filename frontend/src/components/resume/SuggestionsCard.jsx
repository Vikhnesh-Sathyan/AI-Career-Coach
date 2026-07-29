import "../../styles/suggestions.css";

import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

function SuggestionsCard({ analysis }) {

    const suggestions = analysis?.suggestions || [];

    return (

        <motion.div

            className="suggestions-card"

            initial={{ opacity: 0, y: 30 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: .7 }}

        >

            <h2>

                AI Suggestions

            </h2>

            {

                suggestions.length > 0 ? (

                    suggestions.map((tip, index) => (

                        <div

                            className="tip"

                            key={index}

                        >

                            <FaCheckCircle />

                            <span>

                                {tip}

                            </span>

                        </div>

                    ))

                ) : (

                    <p className="no-suggestions">

                        No suggestions available.

                    </p>

                )

            }

        </motion.div>

    );

}

export default SuggestionsCard;