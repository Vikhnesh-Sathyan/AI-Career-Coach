import "../../styles/assistant.css";

import {
    FaRobot,
    FaFileAlt,
    FaMicrophone,
    FaBriefcase,
    FaLightbulb,
    FaTasks
} from "react-icons/fa";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


function AIAssistant() {


    const navigate = useNavigate();



    return (

        <motion.div
            className="assistant-card"
            initial={{ opacity:0,x:-40 }}
            animate={{ opacity:1,x:0 }}
            transition={{ duration:.6 }}
        >


            <div className="assistant-header">


                <div className="assistant-avatar">

                    <FaRobot/>

                </div>


                <div>

                    <h2>
                        AI Career Assistant
                    </h2>

                    <p>
                        Always here to help you
                    </p>

                </div>


            </div>



            <div className="assistant-message">


                <h3>
                    Hello, Vikhnesh 👋
                </h3>


                <p>
                    What would you like to improve today?
                </p>


            </div>



            <div className="assistant-actions">



                <button
                    className="assistant-btn-primary"
                    onClick={() => navigate("/ats")}
                >

                    <FaFileAlt/>

                    Analyse Resume

                </button>





                <button
                    className="assistant-btn-secondary"
                    onClick={() => navigate("/interviews")}
                >

                    <FaMicrophone/>

                    Mock Interview

                </button>





                <button
                    className="assistant-btn-secondary"
                    onClick={() => navigate("/jobs")}
                >

                    <FaTasks/>

                    Available Jobs

                </button>



            </div>




            <div className="assistant-tip">


                <FaLightbulb/>


                <div>


                    <h4>
                        AI Tip
                    </h4>


                    <p>
                        Add measurable achievements in your projects to improve
                        your ATS score.
                    </p>


                </div>


            </div>



        </motion.div>

    );

}


export default AIAssistant;