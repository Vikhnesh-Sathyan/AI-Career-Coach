import "../../styles/jdinput.css";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaClipboardList } from "react-icons/fa";

import { analyzeJob } from "../../services/jobService";


function JDInput() {


    const [jobDescription,setJobDescription] = useState("");

    const [loading,setLoading] = useState(false);

    const [result,setResult] = useState(null);



    const handleAnalyse = async()=>{

        if(!jobDescription.trim()) return;

        setLoading(true);

        try{

            const data = await analyzeJob(jobDescription);

            console.log(data);

            setResult(data);

        }
        catch(error){

            console.log(error);

        }

        setLoading(false);

    };



    return(

        <motion.div

            className="jd-card"

            initial={{opacity:0,y:30}}

            animate={{opacity:1,y:0}}

        >

            <div className="jd-header">

                <FaClipboardList/>

                <h2>
                    Job Description Matcher
                </h2>

            </div>


            <textarea

                placeholder="Paste the Job Description here..."

                value={jobDescription}

                onChange={(e)=>setJobDescription(e.target.value)}

            />


            <button onClick={handleAnalyse}>

                {loading ? "Analysing..." : "Analyse Match"}

            </button>


        </motion.div>

    );

}


export default JDInput;