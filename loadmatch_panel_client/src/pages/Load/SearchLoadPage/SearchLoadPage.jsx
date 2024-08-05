import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoadStore } from "../../../store/useLoadStore";
import SearchedListing from "./SearchedListing";

function SearchLoadPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { source, destination, newSpaceAdded } = state || {};
  const { userSearchedLoads, getLoadSearchListings } = useLoadStore();

  useEffect(() => {
    if (source && destination) {
      const fetchLoadSearchData = async () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const userId = userDetails.user_id;
        const userToken = localStorage.getItem("authToken");
  
        await getLoadSearchListings(source, destination, userId,userToken);
      };
      fetchLoadSearchData();
    }
  }, [source, destination, getLoadSearchListings]);

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
      <SearchedListing userSearchedLoads={userSearchedLoads} />
    </div>
  );
}

export default SearchLoadPage;
