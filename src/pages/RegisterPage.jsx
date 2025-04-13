// src/pages/RegisterPage.jsx
import registerBg from "../assets/loginregister.png";
import logo from "../assets/logo-loginregister.svg";
import backIcon from "../assets/back.png"; // <- gambar tombol back
import { Link, useNavigate } from "react-router-dom";
import "../styles/RegisterPage.css";
import { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [agree, setAgree] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);
  const newErrors = {};
  const validate = () => {
    const nameRegex =
      /^[\p{L}\p{Mn}\p{Pd}'\u2019]+(?: [\p{L}\p{Mn}\p{Pd}'\u2019]+)*$/u;
    const usernameRegex = /^[A-Za-z0-9_]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
    const urlPattern =
      /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,200})([\/\w\-\.]*)*\/?$/;

    if (!name.trim()) {
      newErrors.name = "Fullname is required.";
    } else if (!nameRegex.test(name)) {
      newErrors.name =
        "Only letters, spaces, hyphens, and apostrophes allowed.";
    }

    if (!username.trim()) {
      newErrors.username = "Username is required.";
    } else if (!usernameRegex.test(username)) {
      newErrors.username = "Only letters, numbers, and _ allowed.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Min 8 chars, must include number & special character.";
    }

    if (phone.trim()) {
      if (!/^\d+$/.test(phone)) {
        newErrors.phone = "Phone must be digits only.";
      } else if (phone.length < 5) {
        newErrors.phone = "Phone number too short.";
      }
    }

    if (avatarUrl.trim()) {
      if (!urlPattern.test(avatarUrl)) {
        newErrors.avatarUrl = "Invalid URL format.";
      }
    }

    if (!agree) {
      newErrors.agree = "You must agree to the Terms and Conditions.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validate()) {
      setCanSubmit(true);
      handleAgree();
    }
  };

  const handleAgree = async () => {
    if (!canSubmit) return; // safety guard
    try {
      const response = await axios.post(
        "https://ewalled-api-production.up.railway.app/api/auth/register", // for production
        // "http://localhost:8080/api/auth/register", // for local testing
        {
          email,
          fullname: name,
          password,
          username,
          phoneNumber: phone,
          avatarUrl,
        }
      );
      console.log(response.data); // log
      // setShowTerms(false);
      navigate("/login");
    } catch (error) {
      const msg = error.response?.data?.message;
      if (msg?.toLowerCase().includes("email")) {
        newErrors.email = msg;
      }
      if (msg?.toLowerCase().includes("username")) {
        newErrors.username = msg;
      }
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      setErrors((prev) => ({ ...prev, ...newErrors }));
      setShowTerms(false);
    }
  };

  const handleBack = () => {
    setShowTerms(false);
    // setCanSubmit(false);
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <img src={logo} alt="logo" className="logo" />
        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className="error" id="name-error">
              {errors.name}
            </p>
          )}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <p className="error" id="username-error">
              {errors.username}
            </p>
          )}

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="error" id="email-error">
              {errors.email}
            </p>
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="error" id="password-error">
              {errors.password}
            </p>
          )}

          <input
            type="text"
            placeholder="No HP (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && (
            <p className="error" id="phone-error">
              {errors.phone}
            </p>
          )}

          <input
            type="text"
            placeholder="Avatar URL (optional)"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
          {errors.avatarUrl && (
            <p className="error" id="avatarUrl-error">
              {errors.avatarUrl}
            </p>
          )}

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              disabled={!canSubmit}
            />
            Saya setuju dengan{" "}
            <span
              onClick={() => {
                setShowTerms(true);
                setCanSubmit(true);
              }}
              className="terms-link"
            >
              Syarat & Ketentuan
            </span>
          </label>
          {errors.agree && (
            <p className="error" id="agree-error">
              {errors.agree}
            </p>
          )}

          <button type="submit" onClick={handleRegister}>
            Daftar
          </button>
        </form>
        <p className="login-text">
          Sudah punya akun? <Link to="/login">Login di sini</Link>
        </p>
      </div>
      <div className="register-right">
        <img src={registerBg} alt="register-bg" />
      </div>

      {showTerms && (
        <div className="terms-overlay">
          <div className="terms-popup">
            <div className="terms-header">
              <img
                src={backIcon}
                alt="Back"
                className="back-icon"
                onClick={handleBack}
              />
              <h2 className="terms-title">Syarat & Ketentuan</h2>
            </div>
            <div className="terms-content">
              <p>
                Dengan mendaftar, Anda menyetujui syarat dan ketentuan
                penggunaan layanan e-wallet ini, termasuk pengelolaan data
                pribadi, keamanan transaksi, dan kepatuhan terhadap hukum yang
                berlaku.
              </p>
              <p>
                Pastikan Anda telah membaca dan memahami ketentuan yang berlaku
                sebelum melanjutkan pendaftaran.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterPage;
