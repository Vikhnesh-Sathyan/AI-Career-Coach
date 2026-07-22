import "./Input.css";

import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

function Input({ type, placeholder }) {

    let icon;

    if (type === "email") icon = <FaEnvelope />;
    else if (type === "password") icon = <FaLock />;
    else icon = <FaUser />;

    return (
        <div className="input-box">

            <div className="input-icon">
                {icon}
            </div>

            <input
                className="input-field"
                type={type}
                placeholder={placeholder}
            />

        </div>
    );
}

export default Input;