import { useState } from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import api from "../services/api";

import "../styles/login.css";

import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import Logo from "../components/auth/Logo";

import toast from "react-hot-toast";


function Login() {

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [isSuspended, setIsSuspended] =
        useState(false);


    const navigate =
        useNavigate();


    // ===============================
    // Login
    // ===============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setIsSuspended(false);

        setLoading(true);


        try {

            const response =
                await api.post(
                    "/auth/login",
                    {
                        email,
                        password,
                    }
                );


            if (response.data.success) {

                // ===============================
                // Get token
                // ===============================

                const token =
                    response.data.token;


                // ===============================
                // Get user
                // ===============================

                const user =
                    response.data.user;


                console.log(
                    "Login successful"
                );

                console.log(
                    "User:",
                    user
                );

                console.log(
                    "Role:",
                    user.role
                );


                // ===============================
                // Save token
                // ===============================

                localStorage.setItem(
                    "token",
                    token
                );


                // ===============================
                // Save user
                // ===============================

                localStorage.setItem(
                    "user",
                    JSON.stringify(user)
                );


                // ===============================
                // Success Toast
                // ===============================

                toast.success(
                    `Welcome back, ${user.name || "User"}!`
                );


                // ===============================
                // Role-based navigation
                // ===============================

                if (user.role === "admin") {

                    console.log(
                        "Redirecting to Admin"
                    );

                    navigate("/admin");

                }

                else {

                    console.log(
                        "Redirecting to Dashboard"
                    );

                    navigate("/dashboard");

                }

            }

        }

        catch (error) {

            console.error(
                "Login Error:",
                error.response?.data ||
                error.message
            );


            const message =
                error.response?.data?.message ||
                "Login failed. Please try again.";


            // ===============================
            // Error State
            // ===============================

            setError(message);


            // ===============================
            // Suspended Account
            // ===============================

            if (
                error.response?.status === 403
            ) {

                setIsSuspended(true);

            }

            else {

                setIsSuspended(false);

            }


            // ===============================
            // Error Toast
            // ===============================

            toast.error(message);

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div className="login-page">

            <div
                className="background-circle circle1"
            ></div>

            <div
                className="background-circle circle2"
            ></div>


            <div className="login-card">

                <Logo />


                <form
                    onSubmit={handleSubmit}
                >

                    {/* ===============================
                        EMAIL
                    =============================== */}

                    <div className="form-group">

                        <label>
                            Email Address
                        </label>


                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* ===============================
                        PASSWORD
                    =============================== */}

                    <div className="form-group">

                        <label>
                            Password
                        </label>


                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* ===============================
                        ERROR
                    =============================== */}

                    {error && (

                        <div className="login-error-container">

                            <p
                                className="login-error"
                            >
                                {error}
                            </p>


                            {/* ===============================
                                CONTACT ADMIN
                            =============================== */}

                            {isSuspended && (

                                <button
                                    type="button"
                                    className="contact-admin-button"
                                    onClick={() =>
                                        navigate("/help")
                                    }
                                >
                                    Contact Administrator
                                </button>

                            )}

                        </div>

                    )}


                    {/* ===============================
                        FORGOT PASSWORD
                    =============================== */}

                    <p
                        className="forgot-password"
                    >
                        Forgot Password?
                    </p>


                    {/* ===============================
                        LOGIN BUTTON
                    =============================== */}

                    <Button
                        text={
                            loading
                                ? "Logging in..."
                                : "Continue →"
                        }
                        type="submit"
                    />

                </form>


                {/* ===============================
                    REGISTER
                =============================== */}

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