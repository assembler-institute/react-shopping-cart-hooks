import React from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

function Input({
  label = "",
  id = "input-01",
  value = "",
  handleChange = () => {},
  errorMessage,
  hasErrorMessage,
  ...props
}) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <PhoneInput
        id={id}
        name={id}
        className="border p-1 rounded"
        {...props}
        value={value}
        onChange={handleChange}
        // onBlur={handleBlur}
      />
      {hasErrorMessage && errorMessage && (
        <p className="invalid-feedback">{errorMessage}</p>
      )}
    </div>
  );
}

export default Input;
