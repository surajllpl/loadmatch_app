import React, { useState } from "react";
import SearchForm from "./SearchForm";
import GoogleMap from "./GoogleMapUse"; // Import GoogleMap component
import "./styles.css";
import { useNavigate } from "react-router-dom";

function HomeSearchPanel({
  hsource,
  hdestination,
  setHSource,
  setHDestination,
  setExpanded,
  expanded,
}) {
  const [serviceType, setServiceType] = useState("loads");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const handleServiceTypeChange = (value) => {
    setServiceType(value);
  };

  const toggleExpandableInputs = () => {
    setExpanded(!expanded);
  };
  const navigate = useNavigate();

  const handleSearch = () => {
    // Perform search based on the selected service type (loads or space)
    console.log("Service Type:", serviceType);
    console.log("Source:", source);
    console.log("Destination:", destination);
    // You can implement the search logic here
    if (serviceType === "loads") {
      navigate(`searchLoad`, {
        state: { source, destination },
      });
    } else if (serviceType === "spaces") {
      navigate(`searchSpace`, {
        state: { source, destination },
      });
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center ">
        {!expanded ? (
          <h1 className="text-white font-bold px-5 text-[22px] flex flex-col leading-6">
            <span> What Service are you </span>
            <span>looking for?</span>
          </h1>
        ) : (
          ""
        )}
      </div>
      <div className="flex mx-5 justify-center items-center">
        {expanded ? (
          <>
            <div className="container flex flex-col items-center justify-center mt-8 ">
              <SearchForm
                hsource={hsource}
                hdestination={hdestination}
                setHSource={setHSource}
                setHDestination={setHDestination}
                source={source}
                destination={destination}
                setSource={setSource}
                setDestination={setDestination}
                expanded={expanded}
                setExpanded={setExpanded}
                handleSearch={handleSearch}
                handleServiceTypeChange={handleServiceTypeChange}
              />
            </div>
          </>
        ) : (
          <>
            <div className="container flex items-center justify-center">
              <input
                placeholder="Search Shipments or Trucks"
                type="text"
                autoComplete="off"
                className={`w-full relative rounded-lg my-2 mr-2 focus:outline-none  border border-solid   focus:border-[rgb(34,118,227)] font-medium text-xs leading-3 text-[rgb(20, 24, 35)] py-2 px-4 md:py-5 md:px-4 `}
                onClick={toggleExpandableInputs}
              />{" "}
              <button
                className=" px-4 py-1 bg-white  text-green-600 font-semibold bg-gradient-to-l from-gray-100 via-white to-gray-50 text-md mx-auto rounded-lg outline-none active:scale-95  "
                onClick={toggleExpandableInputs}
              >
                Search
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HomeSearchPanel;
