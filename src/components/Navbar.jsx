import { Link, useNavigate } from "react-router-dom";
import "../css/navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const userName = localStorage.getItem("userName");
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="logo">
    <Link to="/home">
        RealEstate
    </Link>
</div>

            <ul className="nav-links">

                <li>
                    <Link to="/home">Home</Link>
                </li>

                <li>
                    <Link to="/search">Search</Link>
                </li>

                {role === "SELLER" && (
                    <>
                        <li>
                            <Link to="/add-property">
                                Add Property
                            </Link>
                        </li>

                        <li>
                            <Link to="/my-properties">
                                My Properties
                            </Link>
                        </li>
                    </>
                )}

            </ul>

            <div className="right-section">

                <span className="user-name">
                    👤 {userName}
                </span>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;