import "../styles/components/DropdownInput.css";
import { useEffect, useState } from "react";

function DropdownInput({ label, options = [], defaultValue, onChange }) {
  const [selected, setSelected] = useState(defaultValue || options[0]);

  useEffect(() => {
    if (onChange) onChange(selected);
  }, [selected]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
  };

  return (
    <div className="dropdown-input">
      <div className="dropdown-label">{label}</div>
      <select
        className="dropdown-select"
        value={selected}
        onChange={handleChange}
      >
        <option value="">Select Method</option> {/* Tambahkan opsi default */}
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownInput;
