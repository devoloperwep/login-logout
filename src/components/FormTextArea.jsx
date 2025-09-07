import React from "react";

function FormTextArea({ label, name, type }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-700 font-medium">{label}</label>
      <textarea
        name={name}
        className="w-full min-h-[120px] p-3 rounded-xl border border-gray-300 
               bg-gray-100 text-gray-700 outline-none resize-y
               focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 transition"
      />
    </div>
  );
}

export default FormTextArea;
