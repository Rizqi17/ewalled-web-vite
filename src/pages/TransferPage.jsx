import Nav from "../components/Nav";
import "../styles/TransferPage.css";
import AmountInput from "../components/AmountInput";
import NoteInput from "../components/NoteInput";
import PrimaryButton from "../components/PrimaryButton";
import searchIcon from "../assets/search.png";
import notFoundImg from "../assets/Group40.png";
import successImg from "../assets/succesfultf.png";
import failedImg from "../assets/failedtf.png";
import axios from "axios";
import useAuthStore from "../store/authStore";

import { useState } from "react";

function TransferPage() {
  const [accountNumber, setAccountNumber] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [showPopupError, setShowPopupError] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailedPopup, setShowFailedPopup] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});
  const { wallet, updateWalletBalance } = useAuthStore();
  const balance = wallet.balance;

  const handleSearch = async () => {
    if (!accountNumber.trim() || !/^\d+$/.test(accountNumber)) {
      setErrors({
        accountNumber: "Please enter a valid numeric account number.",
      });
      return;
    }

    try {
      const response = await axios.get(
        `https://ewalled-api-production.up.railway.app/api/wallets/check?accountNumber=${accountNumber}`
      );

      console.log(accountNumber);
      const walletData = response.data;
      setAccountName(walletData.fullName);
      setShowPopup(true);
      setErrors({});
    } catch (error) {
      console.error("Account not found:", error);
      setAccountName("");
      setShowPopupError(true);
    }
  };

  const handleConfirm = () => {
    setShowPopup(false);
  };

  const parseCurrency = (str) => {
    return Number(str.replace(/[^0-9,-]+/g, "").replace(",", "."));
  };

  const validateTransfer = () => {
    const newErrors = {};
    const amountNumber = parseFloat(amount);

    if (!accountNumber.trim()) {
      newErrors.accountNumber = "Account number is required.";
    } else if (!/^\d+$/.test(accountNumber)) {
      newErrors.accountNumber = "Account number must be numeric.";
    } else if (accountNumber === wallet.accountNumber) {
      newErrors.accountNumber = "You cannot transfer to your own account.";
    }

    if (!amount.trim()) {
      newErrors.amount = "Amount is required.";
    } else if (isNaN(amountNumber) || amountNumber <= 0) {
      newErrors.amount = "Amount must be a number greater than 0.";
    } else if (amountNumber > parseFloat(wallet.balance)) {
      newErrors.amount = "Insufficient balance.";
    }

    if (note.length > 100) {
      newErrors.note = "Note is too long (max 100 characters).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTransfer = async () => {
    if (!validateTransfer()) return;
    const amountNumber = parseCurrency(amount);

    try {
      const payload = {
        walletId: wallet.id,
        transactionType: "TRANSFER",
        amount: amountNumber,
        recipientAccountNumber: accountNumber,
        description: note,
      };

      const response = await axios.post(
        "https://ewalled-api-production.up.railway.app/api/transactions",
        payload
      );

      const newBalance = Number(wallet.balance) - amountNumber;
      updateWalletBalance(newBalance);
      console.log("Transfer response:", response.data);
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Transfer failed:", error);
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
                  type="numeric"
                  placeholder="Enter account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />

                <button onClick={handleSearch} className="search-button">
                  <img src={searchIcon} alt="Search" />
                </button>
              </div>
              {errors.accountNumber && (
                <p className="error-text">{errors.accountNumber}</p>
              )}
            </div>
            <AmountInput
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              balance={balance}
            />
            {errors.amount && <p className="error-text">{errors.amount}</p>}
            <NoteInput value={note} onChange={(e) => setNote(e.target.value)} />
            {errors.note && <p className="error-text">{errors.note}</p>}
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
                <p className="popup-label">
                  <strong>Account Number</strong>
                </p>
                <p className="popup-value">{accountNumber}</p>
              </div>
              <div className="popup-field">
                <p className="popup-label">
                  <strong>Name</strong>
                </p>
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
              <img
                src={notFoundImg}
                alt="Account not found"
                className="error-popup-image"
              />
              <div className="error-popup-text">
                <h2 className="error-title">
                  <strong>
                    Account Number
                    <br />
                    Not Found!
                  </strong>
                </h2>
                <p className="error-description">
                  We couldn’t find the account
                  <br />
                  number you entered. Please double-
                  <br />
                  check and try again.
                </p>
                <button
                  className="confirm-button"
                  onClick={() => setShowPopupError(false)}
                >
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
              <img
                src={successImg}
                alt="Success"
                className="success-popup-image"
              />
              <div className="success-popup-text">
                <h2 className="success-title">
                  <strong>
                    Yay! Transfer
                    <br />
                    Succesfull!
                  </strong>
                </h2>
                <p className="success-description">
                  Your payment of <strong>{amount}</strong> to
                  <br />
                  <strong>{accountNumber}</strong> is complete.
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

      {/* Popup 4: Failed */}
      {showFailedPopup && (
        <div className="popup-overlay">
          <div className="failed-popup-box">
            <div className="failed-popup-content">
              <img
                src={failedImg}
                alt="Failed"
                className="failed-popup-image"
              />
              <div className="failed-popup-text">
                <h2 className="failed-title">
                  <strong>
                    Oops!
                    <br />
                    Transfer Failed!
                  </strong>
                </h2>
                <p className="failed-description">
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

export default TransferPage;
