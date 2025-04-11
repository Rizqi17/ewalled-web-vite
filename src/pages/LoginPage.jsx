import loginBg from "../assets/loginregister.png";
import logo from "../assets/logo-loginregister.svg";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import { useState } from "react";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Simulasi user seperti di versi mobile
const mockUsers = [
  { email: "test@gmail.com", password: "Password123!" },
  { email: "chelsea@gmail.com", password: "Password123!" },
];

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = (e) => {
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

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setEmailError("Email atau password salah.");
      setPasswordError("Email atau password salah.");
      return;
    }

    // Jika berhasil login
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={logo} alt="logo" className="logo" />
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
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
