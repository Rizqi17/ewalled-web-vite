import React from "react";
import "../styles/components/InOutCard.css";

const InOutCard = ({ title, amount, color }) => {
  return (
    <div className="inout-card" style={{ backgroundColor: color }}>
      <p className="inout-title">{title}</p>
      <p className="inout-amount">Rp{amount}</p>
    </div>
  );
};

export default InOutCard;
