import "../styles/components/Nav.css";
import logo from "../assets/logo.svg";
import mode from "../assets/mode.svg";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function Nav() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav className="nav">
      <img
        src={logo}
        height="40px"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/home")}
      />
      <div className="nav-links">
        <Link to="/home" className="nav-link">
          Dashboard
        </Link>
        <Link to="/financialoverview" className="nav-link">
          Financial Overview
        </Link>
        <Link to="/transfer" className="nav-link">
          Transfer
        </Link>
        <Link to="/topup" className="nav-link">
          Topup
        </Link>
        <Link to="/login" className="nav-link" onClick={handleSignOut}>
          Sign Out
        </Link>
        {/* <div className="vertical-line" />
        <a href="#" className="nav-link" id="mode">
          <img src={mode} height="26px" width="26px" />
        </a> */}
      </div>
    </nav>
  );
}

export default Nav;
