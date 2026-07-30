import "../../styles/statcard.css";
import { motion } from "framer-motion";

function StatCard({
    title,
    value,
    subtitle,
    icon
}) {

    return (

        <motion.div
            className="stat-card"
            whileHover={{
                y: -8,
                scale: 1.02
            }}
            transition={{
                duration: .25
            }}
        >

            <div className="stat-top">

                <div className="stat-icon">
                    {icon}
                </div>

                <div className="trend">

                    ▲ +12%

                </div>

            </div>

            <h2>{value}</h2>

            <h4>{title}</h4>

            <p>{subtitle}</p>

            <div className="stat-progress">

                <div
                    className="stat-progress-fill"
                    style={{ width: "80%" }}
                />

            </div>

        </motion.div>

    );

}

export default StatCard;