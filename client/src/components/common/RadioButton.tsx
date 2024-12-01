import { FC } from "react";
import { RadioButtonProps } from "../../types/types";



const RadioButton: FC<RadioButtonProps> = ({ id, label, onChange, value, checked }) => {
  return (
    <div className="inline-flex items-center space-x-2">
      <label
        htmlFor={id}
        className="relative flex items-center justify-center w-6 h-6 cursor-pointer rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500 transition-all duration-300"
      >
        <input
          name="type"
          type="radio"
          className="peer sr-only"
          id={id}
          value={value}
          onChange={onChange}
          checked={checked}
        />
        <span
          className={`absolute w-4 h-4 bg-white rounded-full scale-0 transition-transform duration-300 ${
            checked ? "scale-100" : ""
          }`}
        ></span>
      </label>
      <label
        className="font-medium text-gray-700 cursor-pointer transition-colors hover:text-purple-600"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
