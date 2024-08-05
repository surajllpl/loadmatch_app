import React, { useState } from "react";
// import locations from "../../../utils/location";

const InputField = ({
  label,
  placeholder,
  id,
  type,
  className,
  value,
  onChange,
  handleCitySelect,
  error,
}) => {
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");

  function handleSelect(location) {
    setInputValue(location);
    setShowSuggestion(false);
    if (handleCitySelect) {
      handleCitySelect(location);
    }
  }

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    setShowSuggestion(value.trim().length > 0);
    if (onChange) {
      onChange(value);
    }
  };

  const formattedData = locations
    .map((location) => {
      const { state, districts } = location;
      const formattedDistricts = districts.map((district) => ({
        district,
        state,
      }));
      return formattedDistricts;
    })
    .flat();

  const filteredLocations = formattedData?.filter(
    (location) =>
      location.state.toLowerCase().startsWith(inputValue.toLowerCase()) ||
      location.district.toLowerCase().startsWith(inputValue.toLowerCase()) ||
      location.district.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className={`inputBox relative p-0 ${className}`}>
      <input
        // placeholder={placeholder ? placeholder : "Enter your text"}
        type={type}
        id={id}
        autoComplete="off"
        value={inputValue}
        onChange={handleInputChange}
        className="w-full relative rounded-lg  focus:outline-none  border border-solid border-slate-200 hover:border-slate-500  focus:border-green-400 font-medium text-xs leading-3 text-[rgb(20, 24, 35)] py-2 px-4 md:py-5 md:px-4 "
      />

      <label
        htmlFor={id}
        className={`absolute select-none top-[-7px] left-2 px-1 rounded bg-[#fff]  font-medium leading-[18px] text-xs ${
          error ? "text-red-500" : "text-[rgb(119,119,119)]"
        } `}
      >
        {label ? label : "Input"}
      </label>

      {showSuggestion && (
        <ul className="suggestions absolute w-full max-h-48 overflow-y-scroll bg-white border rounded-md left-0 top-full z-10">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location, index) => (
              <li
                key={index}
                onClick={() =>
                  handleSelect(`${location.district}, ${location.state}`)
                }
                className="py-1 px-3 text-xs cursor-pointer hover:bg-gray-100"
              >
                {`${location.district}, ${location.state}`}
              </li>
            ))
          ) : (
            <div className="font-medium text-gray-300 text-xs py-4 text-center w-full h-full flex justify-center items-center">
              No results found
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default InputField;
