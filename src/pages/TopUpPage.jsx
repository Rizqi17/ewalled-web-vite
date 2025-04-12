import Nav from "../components/Nav";
import "../styles/TopUpPage.css";
import DropdownInput from "../components/DropdownInput";
import AmountInput from "../components/AmountInput";
import NoteInput from "../components/NoteInput";
import PrimaryButton from "../components/PrimaryButton";
import { useState } from "react";
import topupSuccessImg from "../assets/succesfultf.png";
import topupFailedImg from "../assets/failedtf.png";

function TopUpPage() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailedPopup, setShowFailedPopup] = useState(false);

  const handleTopUp = () => {
    if (amount && method) {
      setShowSuccessPopup(true);
    } else {
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
              balance="IDR 10.000.000"
            />
            <DropdownInput
              label="From"
              options={["BYOND PAY", "Credit Card", "Debit Card"]}
              defaultValue=""
              onChange={(value) => setMethod(value)}
            />
            <NoteInput />
            <PrimaryButton text="Top Up" onClick={handleTopUp} />
          </div>
        </div>
      </div>

      {/* ✅ Popup: Success */}
      {showSuccessPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-content-two-column">
              <img src={topupSuccessImg} alt="Top Up Success" className="popup-image" />
              <div className="popup-text">
                <h2 className="popup-title">
                  <strong>Yay! Top Up<br />Succesfull!</strong>
                </h2>
                <p className="popup-description">
                  Your top up of <strong>{amount}</strong> is complete.<br />
                  Thanks for trusting us!
                </p>
                <button className="confirm-button" onClick={() => setShowSuccessPopup(false)}>
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
              <img src={topupFailedImg} alt="Top Up Failed" className="popup-image" />
              <div className="popup-text">
                <h2 className="popup-title">
                  <strong>Oops!<br />Top Up Failed!</strong>
                </h2>
                <p className="popup-description">
                  Your transaction could not be<br />
                  completed due to insufficient balance.<br />
                  Please top up and try again.
                </p>
                <button className="confirm-button" onClick={() => setShowFailedPopup(false)}>
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
