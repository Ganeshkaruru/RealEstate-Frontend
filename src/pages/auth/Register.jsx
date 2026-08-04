import { useState } from "react";
import "../../css/register.css";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
function Register() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("BUYER");
    const handleRegister = async (e) => {

    e.preventDefault();

    try {

        const user = {

            userName,
            email,
            password,
            confirmPassword,
            role

        };

        const response = await registerUser(user);

        alert("Registration Successful");

       
    
        setRole("BUYER");
        setUserName("");
        setEmail("");
        setPassword("");    
        setRole("BUYER");
        navigate("/login");
      

    }

    catch (error) {

    console.log(error);

    console.log(error.response);

    console.log(error.response?.status);

    console.log(error.response?.data);

}

};
    return (

        <div className="register-page">

            <div className="register-card">

                <h1>Real Estate Portal</h1>

                <p>Create your account</p>

                <form onSubmit={handleRegister}>

                    <div className="form-group">

                        <label>Username</label>

                        <input
                            type="text"
                            placeholder="Enter username"
                            value={userName}
                            onChange={(e)=>setUserName(e.target.value)}
                        />

                    </div>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />

                    </div>
                          <div className="form-group">

                        <label>Confirm Password</label>
                    <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        </div>

                    <div className="form-group">

                        <label>Role</label>

                        <select
                            value={role}
                            onChange={(e)=>setRole(e.target.value)}
                        >
                            <option value="BUYER">Buyer</option>
                            <option value="SELLER">Seller</option>
                        </select>

                    </div>

                    <button type="submit">
                        Register
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Register;