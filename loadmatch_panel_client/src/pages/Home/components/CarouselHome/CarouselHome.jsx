import React, { useEffect, useState } from "react";
import HomeLoadCard from "./HomeLoadCard";
import HomeSpaceCard from "./HomeSpaceCard";
import { useLoadStore } from "../../../../store/useLoadStore";
import { useSpaceStore } from "../../../../store/useSpaceStore";
import { useEnquiryStore } from "../../../../store/useEnquiryStore";
import { all } from "axios";
import HomeEnquiryCard from "./HomeEnquiryCard";

export const CarouselSpace = ({ spaceData }) => {
  return (
    <div className="w-full px-2 py-1 flex gap-2 overflow-auto">
      {spaceData &&
        spaceData.map((space) => (
          <HomeSpaceCard key={space?.space_id} space={space} />
        ))}
    </div>
  );
};

export const CarouselLoad = ({ loadData }) => {
  return (
    <div className="w-full px-2 py-1 flex gap-2 overflow-auto ">
      {loadData &&
        loadData.map((load) => (
          <HomeLoadCard key={load?.load_id} load={load} />
        ))}
    </div>
  );
};

export const CarouselMatches = ({ enquiryData }) => {
  return (
    <div className="w-full px-2 py-1 flex gap-2 overflow-auto">
      {enquiryData &&
        enquiryData.map((enquiry) => (
          <HomeEnquiryCard key={enquiry?.enquiry_id} enquiryData={enquiry} />
        ))}
    </div>
  );
};

function CarouselHome() {
  const { allEnquiries, getAllEnquiries } = useEnquiryStore();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userToken = localStorage.getItem("authToken");
  const userId = userDetails.user_id;
  useEffect(() => {
    (async () => {
      
      await getAllEnquiries(userToken);
    })();
  }, []);
  const { loads, getLoadAllListings } = useLoadStore();
  useEffect(() => {
    (async () => {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      const userId = userDetails.user_id;
      await getLoadAllListings(userId,userToken);
    })();
  }, []);

  const { spaces, getSpaceAllListings } = useSpaceStore();
  useEffect(() => {
    (async () => {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      const userId = userDetails.user_id;
      await getSpaceAllListings(userId,userToken);
    })();
  }, []);
  return (
    <div className="">
      <div className="bg-white py-2">
        <h1 className="text-left mx-2  font-bold text-green-600 ">
          <span className=" mx-1">{loads?.data?.length}</span>
          <span>Active Shipping Orders </span>
        </h1>
        <CarouselLoad loadData={loads?.data} />
      </div>
      <div className="bg-white">
        <h1 className="text-left mx-2  font-bold text-green-600 ">
          <span className=" mx-1">{spaces?.data?.length}</span>
          <span> Active Movers </span>
        </h1>
        <CarouselSpace spaceData={spaces?.data} />
      </div>
      <div className="bg-white">
        <h1 className="text-left mx-2  font-bold text-green-600 ">
          <span className=" mx-1">{allEnquiries?.data?.length}</span>
          <span> Recent Matches </span>
        </h1>
        <CarouselMatches enquiryData={allEnquiries?.data} />
      </div>
    </div>
  );
}

export default CarouselHome;
