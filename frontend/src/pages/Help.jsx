import { useState } from "react";
import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import toast from "react-hot-toast";

import api from "../services/api";

import "../styles/help.css";

function Help() {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    // ==========================================
    // SEND SUPPORT REQUEST
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!email.trim() || !message.trim()) {

            toast.error(
                "Please fill in all fields"
            );

            return;
        }


        setLoading(true);


        try {

            const response = await api.post(
                "/support",
                {
                    email,
                    message
                }
            );


            if (!response.data.success) {

                toast.error(
                    response.data.message ||
                    "Unable to send request"
                );

                return;
            }


            toast.success(
                "Support request sent successfully"
            );


            setEmail("");
            setMessage("");


        } catch (error) {

            console.error(
                "Support request error:",
                error
            );


            toast.error(
                error.response?.data?.message ||
                "Unable to send support request"
            );

        } finally {

            setLoading(false);

        }

    };


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


                <form
                    className="help-form"
                    onSubmit={handleSubmit}
                >

                    <div className="help-form-group">

                        <label>
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                    </div>


                    <div className="help-form-group">

                        <label>
                            Message
                        </label>

                        <textarea
                            placeholder="Explain why you believe your account should be reviewed..."
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                        />

                    </div>


                    <button
                        type="submit"
                        className="help-submit-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Sending..."
                            : "Send Request"
                        }

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