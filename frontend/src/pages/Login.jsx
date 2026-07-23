import api from "../services/api";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./../styles/login.css";

import Logo from "../components/Logo";
import Input from "../components/Input";
import Button from "../components/Button";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const response = await api.post("/auth/login", {
            email,
            password,
        });

        console.log(response.data);

    } catch (error) {

        console.error(error.response?.data || error.message);

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

                        <label>Email Address</label>

                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>

                    <p className="forgot-password">
                        Forgot Password?
                    </p>

                    <Button
                        text="Continue →"
                        type="submit"
                    />

                </form>

                <p className="register-text">
                    Don't have an account?
                    <Link to="/register"> Register</Link>
                </p>

            </div>

        </div>

    );

}

export default Login;