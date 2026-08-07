import { motion } from "framer-motion";

import {
    Users,
    Crown,
    Briefcase,
    BarChart3
} from "lucide-react";

import "../../styles/adminquickstats.css";

function AdminQuickStats() {

    const stats = [

        {
            title: "Users",
            value: "2,340",
            change: "+12%",
            icon: Users
        },

        {
            title: "Premium",
            value: "528",
            change: "+8%",
            icon: Crown
        },

        {
            title: "Jobs",
            value: "942",
            change: "+15%",
            icon: Briefcase
        },

        {
            title: "AI Usage",
            value: "18.4K",
            change: "+32%",
            icon: BarChart3
        }

    ];

    return (

        <div className="quick-stats">

            {

                stats.map((item,index)=>{

                    const Icon=item.icon;

                    return(

                        <motion.div

                            key={index}

                            className="quick-card"

                            initial={{

                                opacity:0,
                                y:30

                            }}

                            animate={{

                                opacity:1,
                                y:0

                            }}

                            transition={{

                                delay:index*.12

                            }}

                            whileHover={{

                                y:-8,
                                scale:1.03

                            }}

                        >

                            <div className="quick-icon">

                                <Icon size={26}/>

                            </div>

                            <h3>

                                {item.title}

                            </h3>

                            <h1>

                                {item.value}

                            </h1>

                            <span>

                                {item.change}

                            </span>

                        </motion.div>

                    );

                })

            }

        </div>

    );

}

export default AdminQuickStats;