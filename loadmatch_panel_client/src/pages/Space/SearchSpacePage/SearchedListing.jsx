import React from "react";
import SpaceCard from "./SpaceCard";

function SearchedListing({ userSearchedSpaces }) {
  return (
    <div className="bg-white min-h-screen mt-10 p-5 rounded-t-3xl flex flex-col gap-2 ">
      <h1 className="text-center text-green-700 font-semibold bg-[#f4f4f4] p-4 rounded-xl">
        Movers Active for Your Shipment
      </h1>{" "}
      {userSearchedSpaces
        ? userSearchedSpaces?.filteredIds?.map((space) => (
            <SpaceCard key={space.space_id} space={space} />
          ))
        : ""}
    </div>
  );
}

export default SearchedListing;
