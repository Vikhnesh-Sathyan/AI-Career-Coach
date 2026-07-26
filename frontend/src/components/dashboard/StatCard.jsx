import "../../styles/statcard.css";

import { motion } from "framer-motion";

function StatCard({ title, value, subtitle, icon }) {

    return (

        <motion.div
            className="stat-card"
            whileHover={{ y: -8 }}
            transition={{ duration: .25 }}
        >

            <div className="stat-icon">

                {icon}

            </div>

            <h2>{value}</h2>

            <h4>{title}</h4>

            <p>{subtitle}</p>

        </motion.div>

    );

}

export default StatCard;