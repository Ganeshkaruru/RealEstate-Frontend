import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import "../../css/login.css";
import { loginUser } from "../../services/authService";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {

    e.preventDefault();

    try {

        const loginData = {
            email,
            password
        };

        const response = await loginUser(loginData);

        localStorage.setItem("token", response.token);
        localStorage.setItem("id", response.id);
        localStorage.setItem("userName", response.userName);
        localStorage.setItem("email", response.email);
        localStorage.setItem("role", response.role);

        alert("Login Successful");

        navigate("/");

    } catch (error) {

        console.log(error);

        alert("Invalid Email or Password");

    }

};

    return (

        <div className="login-page">

            <div className="login-card">

                <h1>Welcome Back</h1>

                <p>Login to your Real Estate account</p>

               <form onSubmit={handleLogin}>
                    <div className="form-group">

                        <label>Email Address</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>

                    <div className="forgot-password">

                        <Link to="/forgot-password">
                            Forgot Password?
                        </Link>

                    </div>

                    <button type="submit">

                        Login

                    </button>

                </form>

                <div className="divider"></div>

                <div className="register-link">

                    <span>
                        Don't have an account?
                    </span>

                    <Link to="/register">

                        Register

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Login;