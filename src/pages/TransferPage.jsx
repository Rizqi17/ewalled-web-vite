import Nav from "../components/Nav";
import "../styles/TransferPage.css";
import AmountInput from "../components/AmountInput";
import NoteInput from "../components/NoteInput";
import PrimaryButton from "../components/PrimaryButton";
import searchIcon from "../assets/search.png";
import { useState } from "react";

function TransferPage() {
  const [accountNumber, setAccountNumber] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [accountName, setAccountName] = useState("");

  const handleSearch = () => {
    console.log("Mencari akun:", accountNumber);

    // Simulasi data, nanti bisa diubah ke API/logic validasi nyata
    if (accountNumber === "1234567890") {
      setAccountName("Budi Santoso");
    } else {
      setAccountName("Nama Tidak Ditemukan");
    }

    setShowPopup(true);
  };

  const handleConfirm = () => {
    setShowPopup(false);
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
              value="IDR 150.000,00"
              balance="IDR 10.000.000"
            />
            <NoteInput />
            <PrimaryButton text="Transfer" />
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2 className="popup-header">Account Info</h2>
            <div className="popup-content">
              <p><strong>Account Number:</strong> {accountNumber}</p>
              <p><strong>Name:</strong> {accountName}</p>
            </div>
            <button className="confirm-button" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TransferPage;
