import React from "react";
import EnquiryCard from "./EnquiryCard";
import { useEnquiryStore } from "../../../store/useEnquiryStore";
import { useEffect } from "react";
import { useLoadStore } from "../../../store/useLoadStore";
import { useSpaceStore } from "../../../store/useSpaceStore";

function EnquiryListing({ userDetails }) {
  const {
    userEnquiries,
    loading,
    error,
    modifyEnquiryStatus,
    getEnquiriesByUserId,
  } = useEnquiryStore();
  const { userLoads, getUserLoads } = useLoadStore();
  const { userSpaces, getUserSpaces } = useSpaceStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const userToken = localStorage.getItem("authToken");
        const userId = userDetails?.user_id;
        await getEnquiriesByUserId(userId, userToken);
        await getUserLoads(userId, userToken);
        await getUserSpaces(userId, userToken);
      } catch (error) {
        console.error("Error Fetching Enquiries Related Data", error);
      }
    };
    fetchData();
  }, [getEnquiriesByUserId]);

  console.log(userDetails, userLoads, userSpaces, userEnquiries);

  return (
    <div className="flex flex-col gap-2">
      {userEnquiries.data?.map((enquiry) => (
        <div key={enquiry.enquiry_id}>
          <EnquiryCard
            enquiryData={enquiry}
            userDetails={userDetails}
            loadsData={userLoads?.data}
            spacesData={userSpaces?.data}
          />
        </div>
      ))}
    </div>
  );
}

export default EnquiryListing;
