import React from "react";
import "../styles/components/BalanceCard.css";

const BalanceCard = ({ balance }) => {
  return (
    <div className="balance-card">
      <p>Balance</p>
      <p className="balance-amount">Rp <b>{balance}</b></p>
    </div>
  );
};

export default BalanceCard;
