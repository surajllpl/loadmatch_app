import React, { useState, useEffect } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const AutoCompleteInput = ({ onSelect, placeholder, label, id, type }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const handlePlaceSelect = async () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place && place.geometry) {
        onSelect(place.formatted_address);
      }
    }
  };
  // Geocoding ,placeapi,direction,geolocation
  return (
    <Autocomplete onLoad={setAutocomplete} onPlaceChanged={handlePlaceSelect}>
      <div className={`inputBox  relative p-0 `}>
        <input
          placeholder={placeholder ? placeholder : ""}
          type="text"
          className={`w-full relative rounded-lg my-2 focus:outline-none  
          border border-solid   focus:border-green-400 font-medium text-[14px] leading-3 text-[rgb(20, 24, 35)] py-2 px-4 md:py-5 md:px-4  `}
        />

        <label
          htmlFor={id}
          className={`absolute select-none top-[0px] left-2 px-1 rounded
           bg-[#fff]  font-medium text-[rgb(119,119,119)] leading-[18px] text-[14px]  
            `}
        >
          {label ? label : "Input"}
        </label>
      </div>
    </Autocomplete>
  );
};

export default AutoCompleteInput;
