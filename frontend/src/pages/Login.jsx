import "./../styles/login.css";

import Logo from "../components/Logo";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="login-page">

            <div className="background-circle circle1"></div>
            <div className="background-circle circle2"></div>

            <div className="login-card">

                <Logo />

                <div className="form-group">

                    <label>Email Address</label>

                    <Input
                        type="email"
                        placeholder="Enter your email"
                    />

                </div>

                <div className="form-group">

                    <label>Password</label>

                    <Input
                        type="password"
                        placeholder="Enter your password"
                    />

                </div>

                <p className="forgot-password">
                    Forgot Password?
                </p>

                <Button text="Continue →" />

            <p className="register-text">
                Don't have an account?
            <Link to="/register"> Register</Link>
            </p>

            </div>

        </div>
    );
}

export default Login;