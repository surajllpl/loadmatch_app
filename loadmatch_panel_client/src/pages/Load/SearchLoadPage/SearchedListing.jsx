import React from "react";
import LoadCard from "./LoadCard";

function SearchedListing({ userSearchedLoads }) {
  return (
    <div className="bg-white mt-10 min-h-screen p-5 rounded-t-3xl flex flex-col gap-2 ">
      <h1 className="text-center font-semibold text-green-700 bg-[#f4f4f4] p-4 rounded-xl">
        Shipments Active for Your Location
      </h1>
      {userSearchedLoads
        ? userSearchedLoads?.loads?.map((load) => (
            <LoadCard key={load.load_id} load={load} />
          ))
        : ""}
    </div>
  );
}

export default SearchedListing;
