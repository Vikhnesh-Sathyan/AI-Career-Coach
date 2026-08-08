import { useState } from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import api from "../services/api";

import "../styles/register.css";

import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import Logo from "../components/auth/Logo";


function Register() {

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    const navigate =
        useNavigate();


    // ===============================
    // Register
    // ===============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setLoading(true);


        try {

            const response =
                await api.post(
                    "/auth/register",
                    {
                        name,
                        email,
                        password,
                    }
                );


            console.log(
                "Registration Response:",
                response.data
            );


            if (response.data.success) {

                // Save token
                localStorage.setItem(
                    "token",
                    response.data.token
                );


                // Save user
                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        response.data.user
                    )
                );


                console.log(
                    "Registration successful"
                );


                // New registered users
                // are normal users
                navigate("/login");

            }

        }

        catch (error) {

            console.error(
                "Registration Error:",
                error.response?.data ||
                error.message
            );


            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );

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

                    {/* Full Name */}

                    <div className="form-group">

                        <label>
                            Full Name
                        </label>


                        <Input
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* Email */}

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


                    {/* Password */}

                    <div className="form-group">

                        <label>
                            Password
                        </label>


                        <Input
                            type="password"
                            placeholder="Create password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* Error */}

                    {error && (

                        <p className="login-error">
                            {error}
                        </p>

                    )}


                    {/* Submit */}

                    <Button
                        text={
                            loading
                                ? "Creating Account..."
                                : "Create Account"
                        }
                        type="submit"
                    />

                </form>


                {/* Login Link */}

                <p className="register-text">

                    Already have an account?

                    <Link to="/login">
                        {" "}Login
                    </Link>

                </p>

            </div>

        </div>

    );

}


export default Register;