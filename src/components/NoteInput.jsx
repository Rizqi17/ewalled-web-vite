import "../styles/components/NoteInput.css";

function NoteInput({ placeholder = "Enter note", value, onChange }) {
  return (
    <div className="note-input">
      <div className="note-label">Notes:</div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
export default NoteInput;
