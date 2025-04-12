import Nav from "../components/Nav";
import "../styles/TransferPage.css";
import AmountInput from "../components/AmountInput";
import NoteInput from "../components/NoteInput";
import PrimaryButton from "../components/PrimaryButton";
import searchIcon from "../assets/search.png";
import notFoundImg from "../assets/Group40.png";
import successImg from "../assets/succesfultf.png";
import failedImg from "../assets/failedtf.png"; // tambahkan gambar gagal

import { useState } from "react";

function TransferPage() {
  const [accountNumber, setAccountNumber] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [showPopupError, setShowPopupError] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailedPopup, setShowFailedPopup] = useState(false);
  const [amount, setAmount] = useState("IDR 150.000");
  const balance = "IDR 10.000.000";

  const handleSearch = () => {
    if (accountNumber === "1234567890") {
      setAccountName("Budi Santoso");
      setShowPopup(true);
    } else {
      setShowPopupError(true);
    }
  };

  const handleConfirm = () => {
    setShowPopup(false);
  };

  const parseCurrency = (str) => {
    return Number(str.replace(/[^0-9,-]+/g, "").replace(",", "."));
  };

  const handleTransfer = () => {
    const amountNumber = parseCurrency(amount);
    const balanceNumber = parseCurrency(balance);

    if (amountNumber <= balanceNumber) {
      setShowSuccessPopup(true);
    } else {
      setShowFailedPopup(true);
    }
  };

  return (
    <>
      <Nav />
      <div className="transfer-page">
        <div className="transfer-container">
          <h1 className="transfer-heading">Transfer</h1>
          <div className="transfer-card">
            {/* Search account number */}
            <div className="account-search">
              <label>To (Account Number)</label>
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="Enter account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
                <button onClick={handleSearch} className="search-button">
                  <img src={searchIcon} alt="Search" />
                </button>
              </div>
            </div>

            <AmountInput
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              balance={balance}
            />
            <NoteInput />
            <PrimaryButton text="Transfer" onClick={handleTransfer} />
          </div>
        </div>
      </div>

      {/* Popup 1: Account Info */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2 className="popup-header">Account Info</h2>
            <div className="popup-content">
              <div className="popup-field">
                <p className="popup-label"><strong>Account Number</strong></p>
                <p className="popup-value">{accountNumber}</p>
              </div>
              <div className="popup-field">
                <p className="popup-label"><strong>Name</strong></p>
                <p className="popup-value">{accountName}</p>
              </div>
            </div>
            <button className="confirm-button" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* Popup 2: Not Found */}
      {showPopupError && (
        <div className="popup-overlay">
          <div className="error-popup-box">
            <div className="error-popup-content">
              <img src={notFoundImg} alt="Account not found" className="error-popup-image" />
              <div className="error-popup-text">
                <h2 className="error-title">
                  <strong>Account Number<br />Not Found!</strong>
                </h2>
                <p className="error-description">
                  We couldn’t find the account<br />
                  number you entered. Please double-<br />
                  check and try again.
                </p>
                <button className="confirm-button" onClick={() => setShowPopupError(false)}>
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup 3: Success */}
      {showSuccessPopup && (
        <div className="popup-overlay">
          <div className="success-popup-box">
            <div className="success-popup-content">
              <img src={successImg} alt="Success" className="success-popup-image" />
              <div className="success-popup-text">
                <h2 className="success-title">
                  <strong>Yay! Transfer<br />Succesfull!</strong>
                </h2>
                <p className="success-description">
                  Your payment of <strong>{amount}</strong> to<br />
                  <strong>{accountNumber}</strong> is complete.<br />
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

      {/* Popup 4: Failed */}
      {showFailedPopup && (
        <div className="popup-overlay">
          <div className="failed-popup-box">
            <div className="failed-popup-content">
              <img src={failedImg} alt="Failed" className="failed-popup-image" />
              <div className="failed-popup-text">
                <h2 className="failed-title">
                  <strong>Oops!<br />Transfer Failed!</strong>
                </h2>
                <p className="failed-description">
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

export default TransferPage;
