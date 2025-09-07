import React from "react";

function FormInput({ label, name, type, style }) {
  return (
    <div>
      <label htmlFor="">{label}</label>
      <input
        className={`outline-none w-full ${style}`}
        type={type}
        name={name}
      />
      <hr />
    </div>
  );
}

export default FormInput;
