import "../../styles/skillscard.css";

import { motion } from "framer-motion";
import {
    FaCode,
    FaServer,
    FaDatabase,
    FaLaptopCode,
    FaBrain,
    FaTools


} from "react-icons/fa";


function SkillsCard({ analysis }) {

    const skills = analysis?.skills || [];

    const frontend = [

        "React",
        "React.js",
        "Angular",
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
        "Tailwind CSS",
        "Bootstrap"
        

    ];
    const backend = [

         "Node.js",
         "Express",
         "Express.js",
         "REST API",
         "JWT"


    ];
    const database = [

         "MongoDB",
         "MySQL",
         "SQL",
         "PostgreSQL",
         "Firebase"

    ];
    const programming = [

         "Java",
         "Python",
         "C",
         "C++",
         "C#",
         "JavaScript",
         "TypeScript",
         "Go",

    ];
    const ai = [

        "NLP",
        "spaCy",
        "Machine Learning",
        "Artificial Intelligence"

    ];
const tools = [

    "Git",
    "GitHub",
    "Postman",
    "VS Code"

];
    const renderGroup = (title, icon, list) => {

        const filtered = list.filter(skill => skills.includes(skill));

        if (filtered.length === 0) return null;

        return (

            <div className="skill-group">

                <div className="group-title">

                    {icon}

                    <span>{title}</span>

                </div>

                <div className="skill-badges">

                    {

                        filtered.map(skill => (

                            <span

                                key={skill}

                                className="skill-badge"

                            >

                                {skill}

                            </span>

                        ))

                    }

                </div>

            </div>

        );

    };

    return (

        <motion.div

            className="skills-card"

            initial={{ opacity:0,y:30 }}

            animate={{ opacity:1,y:0 }}

            transition={{ duration:.7 }}

        >

            <h2>

                Skills Found

            </h2>

            {renderGroup("Frontend",<FaLaptopCode/>,frontend)}

            {renderGroup("Backend",<FaServer/>,backend)}

            {renderGroup("Database",<FaDatabase/>,database)}

            {renderGroup("Programming",<FaCode/>,programming)}

            {renderGroup("AI / ML", <FaBrain />, ai)}

            {renderGroup("Tools", <FaTools />, tools)}

            <div className="skills-footer">

                <span>

                    ✓ {skills.length} Skills Detected

                </span>

            </div>

        </motion.div>

    );

}

export default SkillsCard;