import React from "react";

function FormInput({ label, name, type }) {
  return (
    <div>
      <label htmlFor="">{label}</label>
      <input className="outline-none w-full" type={type} name={name} />
      <hr />
    </div>
  );
}

export default FormInput;
