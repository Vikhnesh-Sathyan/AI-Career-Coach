import "../../styles/logo.css";

import { FaRobot } from "react-icons/fa";

function Logo() {
    return (
        <div className="logo-container">
            <FaRobot className="logo-icon" />

            <h1>AI Career Coach</h1>

            <p>Accelerate Your Software Career</p>
        </div>
    );
}

export default Logo;