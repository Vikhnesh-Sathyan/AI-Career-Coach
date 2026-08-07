import { motion } from "framer-motion";

import {
    UserPlus,
    FileText,
    Crown,
    Briefcase
} from "lucide-react";

import "../../styles/adminactivity.css";

function AdminActivity() {

    const activities = [

        {
            icon: UserPlus,
            title: "New user registered",
            time: "2 min ago"
        },

        {
            icon: FileText,
            title: "Resume analyzed",
            time: "8 min ago"
        },

        {
            icon: Crown,
            title: "Premium subscription purchased",
            time: "18 min ago"
        },

        {
            icon: Briefcase,
            title: "New job posted",
            time: "1 hour ago"
        }

    ];

    return (

        <div className="activity-card">

            <h3>

                Recent Activity

            </h3>

            {

                activities.map((item,index)=>{

                    const Icon=item.icon;

                    return(

                        <motion.div

                            key={index}

                            className="activity-item"

                            initial={{

                                opacity:0,
                                x:-30

                            }}

                            animate={{

                                opacity:1,
                                x:0

                            }}

                            transition={{

                                delay:index*.12

                            }}

                        >

                            <div className="activity-icon">

                                <Icon size={18}/>

                            </div>

                            <div className="activity-text">

                                <h4>

                                    {item.title}

                                </h4>

                                <p>

                                    {item.time}

                                </p>

                            </div>

                        </motion.div>

                    );

                })

            }

        </div>

    );

}

export default AdminActivity;