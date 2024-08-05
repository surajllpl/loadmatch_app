import React, { useEffect } from "react";
import { Select } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import AutoCompleteInput from "../../../components/InputBoxApi/AutoCompleteInput";
import MapLoader from "../../../components/MapLoader/MapLoad";
import SwapButton from "../../../components/SmallComponents/Buttons/SwapButton";
import SwitchTabs from "../components/SwitchTabs/SwitchTabs";
const { Option } = Select;

function SearchForm({
  source,
  destination,
  setSource,
  setDestination,
  expanded,
  setExpanded,
  handleSearch,
  handleServiceTypeChange,
  setHSource,
  setHDestination,
}) {
  const handleSourceChange = (value) => {
    setSource(value);
  };

  const handleDestinationChange = (value) => {
    setDestination(value);
  };

  useEffect(() => {
    document.getElementById("searchForm").scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);
  const handleTableChange = (tab) => {
    handleServiceTypeChange(tab === "Find Loads"?"loads":"spaces")
    
 }

  return (
    <div id="searchForm" className="w-full bg-white relative p-2 rounded-xl ">
      <h1 className="text-center text-xs  mt-2 text-green-600 font-bold p-1">
        Set Destination and Service Type
      </h1>
      <div className="flex flex-col flex-1  p-1 gap-0.5">
        {" "}
        {/* <MapLoader> */}
          <AutoCompleteInput
            setLocation={setHSource}
            label="Pickup Point"
            value={source}
            type="text"
            onSelect={handleSourceChange}
          />
          <SwapButton className="self-center swap-button flex items-center justify-center bg-white cursor-pointer z-[1] rounded-xl border shadow-md w-8 h-8 m-[-20px] " />
          <AutoCompleteInput
            setLocation={setHDestination}
            label="Drop-off Point"
            value={destination}
            type="text"
            onSelect={handleDestinationChange}
          />
          <button
            className=" px-4 py-1 bg-green-400 w-full  text-white font-semibold bg-gradient-to-l from-green-300 via-green-400 to-green-500 text-md mx-auto rounded-xl  outline-none active:scale-95  "
            onClick={handleSearch}
          >
            Confirm Route
          </button>{" "}
          <div className="absolute top-[-16px] right-[10px] border rounded-3xl">
            
              <SwitchTabs data={["Find Loads","Find Spaces"]}
            onTabChange={handleTableChange}/>
             
          </div>
          <div
            onClick={() => {
              setExpanded((prev) => !prev);
            }}
            className="bg-white  rounded-xl active:scale-95 absolute top-[-16px] px-2 py-1 border shadow-sm"
          >
            <button className="text-xs text-green-600 active:scale-95">
              <FaArrowLeft />
            </button>
          </div>{" "}
        {/* </MapLoader> */}
      </div>
    </div>
  );
}

export default SearchForm;
