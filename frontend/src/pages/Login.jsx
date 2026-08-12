import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

import "../styles/login.css";

import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import Logo from "../components/auth/Logo";

import toast from "react-hot-toast";


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [isSuspended, setIsSuspended] = useState(false);
    const [supportStatus, setSupportStatus] = useState("");
    const [adminResponse, setAdminResponse] = useState("");

    const navigate = useNavigate();


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setIsSuspended(false);
        setSupportStatus("");
        setAdminResponse("");

        if (!email.trim() || !password.trim()) {

            const message =
                "Email and password are required.";

            setError(message);
            toast.error(message);

            return;
        }

        setLoading(true);

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email: email.trim(),
                    password
                }
            );


            if (response.data.success) {

                const token =
                    response.data.token;

                const user =
                    response.data.user;


                localStorage.setItem(
                    "token",
                    token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(user)
                );


                toast.success(
                    `Welcome back, ${user.name || "User"}!`
                );


                if (user.role === "admin") {

                    navigate("/admin");

                } else {

                    navigate("/dashboard");

                }

            }

        } catch (error) {

            console.error(
                "Login Error:",
                error.response?.data || error.message
            );


            const data =
                error.response?.data;


            const message =
                data?.message ||
                "Login failed. Please try again.";


            setError(message);


            // ===============================
            // SUSPENDED USER
            // ===============================

            if (error.response?.status === 403) {

                setIsSuspended(true);

                setSupportStatus(
                    data?.supportStatus || ""
                );

                setAdminResponse(
                    data?.adminResponse || ""
                );

            }


            toast.error(message);

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="login-page">

            <div className="background-circle circle1"></div>

            <div className="background-circle circle2"></div>


            <div className="login-card">

                <Logo />


                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>
                            Email Address
                        </label>

                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                    </div>


                    {/* NORMAL ERROR */}

                    {error && !isSuspended && (

                        <p className="login-error">
                            {error}
                        </p>

                    )}

{/* ==========================================
    SUSPENDED ACCOUNT
========================================== */}

{isSuspended && (

    <div className="suspended-help">

        {/* Main message */}

        <p className="suspended-message">
            Your account is currently suspended.
        </p>


        {/* ==================================
            PENDING REQUEST
        ================================== */}

        {supportStatus === "pending" && (

            <div className="support-pending">

                <p>
                    Your account review request is
                    currently under review.
                </p>

                <p>
                    Please wait for the administrator
                    to review your request.
                </p>

            </div>

        )}


        {/* ==================================
            REJECTED REQUEST
        ================================== */}

        {supportStatus === "rejected" && (

            <div className="support-rejected">

                <p>
                    Your previous account review
                    request was rejected.
                </p>


                {adminResponse && (

                    <div className="admin-response">

                        <strong>
                            Admin Response
                        </strong>

                        <p>
                            {adminResponse}
                        </p>

                    </div>

                )}


                <Link to="/help">
                    Submit Another Request
                </Link>

            </div>

        )}


        {/* ==================================
            NO REQUEST
        ================================== */}

        {supportStatus !== "pending" &&
         supportStatus !== "rejected" && (

            <div className="support-contact">

                <p>
                    Need help with your account?
                </p>

                <Link to="/help">
                    Contact Administrator
                </Link>

            </div>

        )}

    </div>

)}


                    <p className="forgot-password">
                        Forgot Password?
                    </p>


                    <Button
                        text={
                            loading
                                ? "Logging in..."
                                : "Continue →"
                        }
                        type="submit"
                    />

                </form>


                <p className="register-text">

                    Don't have an account?

                    <Link to="/register">
                        {" "}Register
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;