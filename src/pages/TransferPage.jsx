import Nav from "../components/Nav";
import "../styles/TransferPage.css";
import AmountInput from "../components/AmountInput";
import NoteInput from "../components/NoteInput";
import PrimaryButton from "../components/PrimaryButton";
import searchIcon from "../assets/search.png";

import { useState } from "react";

function TransferPage() {
  const [accountNumber, setAccountNumber] = useState("");
  
  const handleSearch = () => {
    console.log("Mencari akun:", accountNumber);
    // Tambahkan logika validasi akun di sini
  };

  return (
    <>
      <Nav />
      <div className="transfer-page">
        <div className="transfer-container">
          <h1 className="transfer-heading">Transfer</h1>
          <div className="transfer-card">

            {/* GANTI DropdownInput dengan ini */}
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

            {/* Komponen lain tetap */}
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
    </>
  );
}

export default TransferPage;
