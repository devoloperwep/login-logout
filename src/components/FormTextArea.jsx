import React from "react";

function FormTextArea({ label, name, type }) {
  return (
    <div>
      <label htmlFor="">{label}</label>
      <textarea className="outline-none bg-base-300" type={type} name={name} />
    </div>
  );
}

export default FormTextArea;
