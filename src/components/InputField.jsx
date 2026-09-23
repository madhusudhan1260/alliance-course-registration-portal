// Reusable input: all values come in as props from the parent form
function InputField({ label, name, type = "text", value, onChange, error, placeholder }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? "input-error" : ""}
      />
      {/* Conditional rendering: show the error only if there is one */}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default InputField;
