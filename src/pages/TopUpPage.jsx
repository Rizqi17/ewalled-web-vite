import Nav from "../components/Nav";
import "../styles/TopUpPage.css";
import DropdownInput from "../components/DropdownInput";
import AmountInput from "../components/AmountInput";
import NoteInput from "../components/NoteInput";
import PrimaryButton from "../components/PrimaryButton";
import { useState } from "react";
import topupSuccessImg from "../assets/succesfultf.png";
import topupFailedImg from "../assets/failedtf.png";
import axios from "axios";
import useAuthStore from "../store/authStore";

function TopUpPage() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailedPopup, setShowFailedPopup] = useState(false);
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});

  const { wallet, updateWalletBalance } = useAuthStore();

  const validateTopUp = () => {
    const newErrors = {};

    if (!amount.trim()) {
      newErrors.amount = "Amount is required.";
    } else if (isNaN(amount) || parseFloat(amount) <= 0) {
      newErrors.amount = "Amount must be a number greater than 0.";
    }

    if (!method.trim()) {
      newErrors.method = "Payment method is required.";
    }

    if (note.length > 100) {
      newErrors.note = "Note is too long (max 100 characters).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTopUp = async () => {
    if (!validateTopUp()) {
      return;
    }

    try {
      const payload = {
        walletId: wallet.id,
        transactionType: "TOP_UP",
        amount: parseFloat(amount),
        recipientWalletId: null,
        transactionDate: new Date().toISOString(),
        description: note,
      };

      await axios.post(
        "https://ewalled-api-production.up.railway.app/api/transactions",
        payload
      );

      const newBalance = Number(wallet.balance) + parseFloat(amount);
      updateWalletBalance(newBalance);
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Top up failed:", error);
      setShowFailedPopup(true);
    }
  };

  return (
    <>
      <Nav />
      <div className="topup-page">
        <div className="topup-container">
          <h1 className="topup-heading">Top Up</h1>
          <div className="topup-card">
            <AmountInput
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              balance={wallet.balance}
            />
            {errors.amount && <p className="error-text">{errors.amount}</p>}
            <DropdownInput
              label="From"
              options={["BYOND PAY", "Credit Card", "Debit Card"]}
              defaultValue=""
              onChange={(value) => setMethod(value)}
            />
            {errors.method && <p className="error-text">{errors.method}</p>}
            <NoteInput value={note} onChange={(e) => setNote(e.target.value)} />
            {errors.note && <p className="error-text">{errors.note}</p>}
            <PrimaryButton text="Top Up" onClick={handleTopUp} />
          </div>
        </div>
      </div>

      {/* ✅ Popup: Success */}
      {showSuccessPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-content-two-column">
              <img
                src={topupSuccessImg}
                alt="Top Up Success"
                className="popup-image"
              />
              <div className="popup-text">
                <h2 className="popup-title">
                  <strong>
                    Yay! Top Up
                    <br />
                    Succesfull!
                  </strong>
                </h2>
                <p className="popup-description">
                  Your top up of <strong>{amount}</strong> is complete.
                  <br />
                  Thanks for trusting us!
                </p>
                <button
                  className="confirm-button"
                  onClick={() => setShowSuccessPopup(false)}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ❌ Popup: Failed */}
      {showFailedPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-content-two-column">
              <img
                src={topupFailedImg}
                alt="Top Up Failed"
                className="popup-image"
              />
              <div className="popup-text">
                <h2 className="popup-title">
                  <strong>
                    Oops!
                    <br />
                    Top Up Failed!
                  </strong>
                </h2>
                <p className="popup-description">
                  Your transaction could not be
                  <br />
                  completed due to insufficient balance.
                  <br />
                  Please top up and try again.
                </p>
                <button
                  className="confirm-button"
                  onClick={() => setShowFailedPopup(false)}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TopUpPage;
