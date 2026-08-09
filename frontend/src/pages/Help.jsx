import { useState } from "react";

import api from "../services/api";

import toast from "react-hot-toast";

import "../styles/help.css";


function Help() {

    const [message, setMessage] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!message.trim()) {

            toast.error(
                "Please enter your message."
            );

            return;

        }


        try {

            setLoading(true);


            const token =
                localStorage.getItem("token");


            const response =
                await api.post(
                    "/support",
                    {
                        message: message.trim()
                    },
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


            if (response.data.success) {

                toast.success(
                    "Your request has been sent to the administrator."
                );

                setMessage("");

            }

        }

        catch (error) {

            console.error(
                "Support request error:",
                error
            );


            toast.error(
                error.response?.data?.message ||
                "Unable to send request."
            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div className="help-page">

            <div className="help-card">

                <div className="help-header">

                    <span>
                        ACCOUNT SUPPORT
                    </span>

                    <h1>
                        Contact Administrator
                    </h1>

                    <p>
                        If you believe your account was
                        suspended by mistake, send a
                        request to the administrator.
                    </p>

                </div>


                <form
                    onSubmit={handleSubmit}
                >

                    <label>
                        Message
                    </label>


                    <textarea
                        value={message}
                        onChange={(e) =>
                            setMessage(
                                e.target.value
                            )
                        }
                        placeholder="Explain why you believe your account should be reviewed..."
                        rows="6"
                    />


                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Sending..."
                            : "Send Request"
                        }

                    </button>

                </form>

            </div>

        </div>

    );

}


export default Help;