import "../../styles/dashboardhero.css";

import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";

function DashboardHero() {

    const hour = new Date().getHours();

    let greeting = "";

    if (hour < 12) {

        greeting = "Good Morning ☀️";

    } else if (hour < 17) {

        greeting = "Good Afternoon 🌤";

    } else {

        greeting = "Good Evening 🌙";

    }

    const quotes = [

        "Every application brings you closer to your dream career.",

        "Small improvements every day create big opportunities.",

        "Success begins with a single application.",

        "Consistency beats talent when talent doesn't stay consistent.",

        "Your future employer could be one click away."

    ];

    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    return (

        <motion.div

            className="dashboard-hero"

            initial={{ opacity:0, y:30 }}

            animate={{ opacity:1, y:0 }}

            transition={{ duration:.6 }}

        >

            <div>

                <p className="hero-greeting">

                    {greeting},

                </p>

                <h1>

                    Vikhnesh 👋

                </h1>

                <p className="hero-quote">

                    {quote}

                </p>

                <button className="hero-start-btn">

                    <FaRocket />

                    Continue Building Career

                </button>

            </div>

        </motion.div>

    );

}

export default DashboardHero;