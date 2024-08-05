import React, { useState, useEffect, useRef } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

const InputBoxApi = ({
  label,
  placeholder,
  id,
  type,
  value,
  onChange,
  onSelect,
  error,
  name,
  className,
}) => {
  const [address, setAddress] = useState(value);
  const [isScriptLoaded, setScriptLoaded] = useState(false);
  const [isScriptLoadError, setScriptLoadError] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (!window.google) {
      console.warn( "goooogle api ",import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY)
      let apikey ="AIzaSyDBG0iCBWFjXTnSXj6SP9VMGfPn0EVAIkw";
      console.warn( "goooogle api",apikey )

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        apikey
      }&v=weekly&libraries=${libraries.join(",")}`;
      script.async = true;
      script.defer = true;
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => setScriptLoadError(true);
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    } else {
      setScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isScriptLoaded && !autocompleteRef.current) {
      autocompleteRef.current =
        new window.google.maps.places.AutocompleteService();
    }
  }, [isScriptLoaded]);

  const handlePlaceSelect = (place) => {
    const formattedAddress = [
      place.structured_formatting.main_text,
      place.structured_formatting.secondary_text,
    ]
      .filter(Boolean)
      .join(", ");

    setAddress(formattedAddress);

    if (onSelect) {
      onSelect({ address: formattedAddress, place });
    }
  };

  const handleInputChange = (e) => {
    setAddress(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }

    if (isScriptLoaded) {
      autocompleteRef.current.getPlacePredictions(
        { input: e.target.value },
        handleSuggestions
      );
    }
  };

  const handleSuggestions = (predictions, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      setSuggestions(predictions.map((prediction) => prediction.description));
    } else {
      setSuggestions([]);
    }
  };

  const handleLoadScriptError = (error) => {
    console.error("Error loading Google Maps script:", error);
    setScriptLoadError(true);
  };

  if (isScriptLoadError) {
    return <div>Error loading Google Maps script. Please try again later.</div>;
  }

  return (
    <div className={`inputBox relative p-0 ${className}`}>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
        onError={handleLoadScriptError}
      >
        <Autocomplete
          onLoad={(autocomplete) => {
            if (!autocompleteRef.current) {
              autocompleteRef.current = autocomplete;
            }
          }}
          onPlaceChanged={() =>
            handlePlaceSelect(autocompleteRef.current.getPlace())
          }
        >
          <input
            type={type}
            id={id}
            autoComplete="off"
            value={address}
            onChange={handleInputChange}
            placeholder={placeholder || label}
            className={`w-full relative rounded-lg my-2 focus:outline-none border border-solid focus:border-green-500 font-medium text-xs leading-3 text-[rgb(20, 24, 35)] py-2 px-4 md:py-5 md:px-4 ${
              error
                ? "border-red-500"
                : "border-slate-200 hover:border-slate-500"
            }`}
          />
        </Autocomplete>
      </LoadScript>
      <label
        htmlFor={id}
        className={`absolute select-none top-[2px] left-2 px-1 rounded bg-[#fff] font-medium leading-[18px] text-xs ${
          error ? "text-red-500" : "text-[rgb(119,119,119)]"
        }`}
      >
        {label || "Input"}
      </label>
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 z-10 bg-white border border-solid border-gray-200 shadow-lg rounded-md py-1 mt-1">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="cursor-pointer px-3 py-1 hover:bg-gray-100"
              onClick={() => setAddress(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputBoxApi;
