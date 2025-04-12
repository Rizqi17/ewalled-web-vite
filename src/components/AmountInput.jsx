// components/AmountInput.jsx
import "../styles/components/AmountInput.css";

function AmountInput({ label, value, onChange, balance }) {
  return (
    <div className="amount-container">
      <div className="amount-label">{label}</div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Enter amount"
      />
      <p className="balance">
        Balance: <span>{balance}</span>
      </p>
    </div>
  );
}

export default AmountInput;
