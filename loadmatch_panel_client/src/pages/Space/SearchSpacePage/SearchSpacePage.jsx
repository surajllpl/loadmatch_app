import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchedListing from "./SearchedListing";
import { useSpaceStore } from "../../../store/useSpaceStore";

function SearchSpacePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { source, destination, newSpaceAdded } = state || {};
  const { userSearchedSpaces, getSpaceSearchListing } = useSpaceStore();
  console.log(userSearchedSpaces);

  useEffect(() => {
    if (source && destination) {
      const fetchSpaceSearchData = async () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const userId = userDetails.user_id;
        const userToken = localStorage.getItem("authToken");

        await getSpaceSearchListing(source, destination, userId,userToken);
      };
      fetchSpaceSearchData();
    }
  }, [source, destination, getSpaceSearchListing]);
  useEffect(() => {
    if (!source || !destination) {
      navigate("/");
    }
  }, [source, destination, navigate]);

  if (!source || !destination) {
    return null; // Optionally render nothing while redirecting
  }
  return (
    <div className="bg-[#f4f4f4] rounded-t-3xl ">
      <SearchedListing userSearchedSpaces={userSearchedSpaces} />
    </div>
  );
}

export default SearchSpacePage;
