import React from "react";
import { LoadScript } from "@react-google-maps/api";

const libraries = ["places"];

const MapLoader = ({ children }) => {
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY}
      libraries={libraries}
    >
      {children}
    </LoadScript>
  );
};

export default MapLoader;
