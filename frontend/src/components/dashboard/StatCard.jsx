import "../../styles/statcard.css";
import { motion } from "framer-motion";

function StatCard({
    title,
    value,
    subtitle,
    icon,
    color = "#3B82F6",
    progress = 80,
    trend = "+12%"
}) {

    return (

        <motion.div
            className="stat-card"
            whileHover={{
                y: -10,
                scale: 1.03
            }}
            transition={{
                duration: 0.25
            }}
        >

            <div className="stat-top">

                <div
                    className="stat-icon"
                    style={{
                        background: `linear-gradient(135deg, ${color}, ${color}99)`
                    }}
                >
                    {icon}
                </div>

                <div className="trend">

                    ▲ {trend}

                </div>

            </div>

            <h2>{value}</h2>

            <h4>{title}</h4>

            <p>{subtitle}</p>

            <div className="stat-progress">

                <div
                    className="stat-progress-fill"
                    style={{
                        width: `${progress}%`,
                        background: `linear-gradient(90deg, ${color}, ${color}AA)`
                    }}
                />

            </div>

        </motion.div>

    );

}

export default StatCard;