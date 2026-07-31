import "../../styles/loadingmatch.css";

import { motion } from "framer-motion";


function LoadingMatch(){


return (

<motion.div

className="loading-match"

initial={{opacity:0}}

animate={{opacity:1}}

transition={{duration:0.5}}

>


<h2>
🤖 AI is analyzing your resume...
</h2>


<p>
Comparing skills with job requirements
</p>


</motion.div>

);


}


export default LoadingMatch;