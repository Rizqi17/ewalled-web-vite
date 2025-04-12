import loginBg from "../assets/loginregister.png";
import logo from "../assets/logo-loginregister.svg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import { useState } from "react";
import useAuthStore from "../store/authStore";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// const mockUsers = [
//   { email: "test@gmail.com", password: "Password123!" },
//   { email: "chelsea@gmail.com", password: "Password123!" },
// ];

function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!email || !password) {
      if (!email) setEmailError("Mohon isi email.");
      if (!password) setPasswordError("Mohon isi password.");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Format email tidak valid.");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://ewalled-api-production.up.railway.app/api/auth/login", // for production
        // "http://localhost:8080/api/auth/login", // for local testing
        {
          email,
          password,
        }
      );

      setUser(data);
      navigate("/home");
    } catch (err) {
      const message = "Email atau password salah.";
      setEmailError(message);
      setPasswordError(message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={logo} alt="logo" className="logo" />
        <form className="login-form" onSubmit={handleLogin}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            className={emailError ? "input-error" : ""}
          />
          {emailError && (
            <p className="error-text" id="email-error">
              {emailError}
            </p>
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
            className={passwordError ? "input-error" : ""}
          />
          {passwordError && (
            <p className="error-text" id="password-error">
              {passwordError}
            </p>
          )}

          <button type="submit">Login</button>
        </form>
        <p className="register-text">
          Belum punya akun? <Link to="/register">Daftar di sini</Link>
        </p>
      </div>
      <div className="login-right">
        <img src={loginBg} alt="money" />
      </div>
    </div>
  );
}

export default LoginPage;
