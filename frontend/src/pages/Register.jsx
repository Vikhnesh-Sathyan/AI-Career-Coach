import "./../styles/login.css";

import Logo from "../components/Logo";
import Input from "../components/Input";
import Button from "../components/Button";

import { Link } from "react-router-dom";

function Register() {

    return (

        <div className="login-page">

            <div className="background-circle circle1"></div>
            <div className="background-circle circle2"></div>

            <div className="login-card">

                <Logo />

                <div className="form-group">

                    <label>Full Name</label>

                    <Input
                        type="text"
                        placeholder="Enter your full name"
                    />

                </div>

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
                        placeholder="Create password"
                    />

                </div>

                <Button text="Create Account" />

                <p className="register-text">

                    Already have an account?

                    <Link to="/"> Login</Link>

                </p>

            </div>

        </div>

    );

}

export default Register;