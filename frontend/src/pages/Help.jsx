import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";

import "../styles/help.css";

function Help() {
    return (
        <div className="help-page">

            <div className="help-background-circle help-circle1"></div>

            <div className="help-background-circle help-circle2"></div>

            <div className="help-card">

                <div className="help-header">

                    <div className="help-icon">
                        <HelpCircle size={28} />
                    </div>

                    <h1>
                        Account Support
                    </h1>

                    <p>
                        Your account is currently suspended.
                        Send a request to the administrator
                        for review.
                    </p>

                </div>


                <form className="help-form">

                    <div className="help-form-group">

                        <label>
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                        />

                    </div>


                    <div className="help-form-group">

                        <label>
                            Message
                        </label>

                        <textarea
                            placeholder="Explain why you believe your account should be reviewed..."
                        />

                    </div>


                    <button
                        type="submit"
                        className="help-submit-btn"
                    >
                        Send Request
                    </button>

                </form>


                <div className="help-back">

                    <Link to="/login">
                        ← Back to Login
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Help;