import { FC } from "react";
import { InputFieldProp } from "../../types/types";



const InputField:FC<InputFieldProp> = ({ label, id, name, type = "text", onChange, value }) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-800 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          className="p-3 w-full border-2 border-gray-300 rounded-lg text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300"
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
        <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
          {type === "password" ? "🔒" : "✏️"}
        </span>
      </div>
    </div>
  );
};

export default InputField;
