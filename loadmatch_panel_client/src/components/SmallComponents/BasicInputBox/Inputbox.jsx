import React, { useState, useRef } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";

const Inputbox = ({
  label,
  placeholder,
  id,
  type,
  value,
  onChange,
  error,
  name,
  className,
  onBlur,
  toggleExpandableInputs,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);
  // console.log(onChange);
  return (
    <div className={`inputBox  relative p-0  ${className}`}>
      <input
        placeholder={placeholder ? placeholder : "Enter your text"}
        type={type}
        id={id}
        name={name} // Added name attribute
        ref={label === "Password" ? inputRef : null}
        value={value}
        autoComplete="off"
        className={`w-full relative rounded-lg my-3 focus:outline-none  border border-solid   focus:border-green-400 font-medium text-[14px]  leading-3 text-[rgb(20, 24, 35)] py-2 px-4 md:py-5 md:px-4 ${
          error ? "border-red-500" : "border-slate-200 hover:border-slate-500"
        }`}
        onChange={onChange}
        onClick={toggleExpandableInputs}
        onBlur={onBlur}
      />

      <label
        htmlFor={id}
        className={`absolute select-none top-[1px] left-2 px-1 rounded bg-[#fff]
          font-medium leading-[18px] text-[14px]  ${
          error ? "text-red-500" : "text-[rgb(119,119,119)]"
        } `}
      >
        {label ? label : "Input"}
      </label>

      {label === "Password" && (
        <div
          className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 text-2xl text-slate-400 transition-all"
          onClick={() => {
            setShowPassword((prev) => !prev);
            inputRef.current.type = !showPassword ? "text" : "password";
          }}
        >
          {showPassword ? <BiHide /> : <BiShowAlt />}{" "}
        </div>
      )}
    </div>
  );
};

export default Inputbox;
