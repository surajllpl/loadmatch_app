import React from "react";
import LoadCard from "./LoadCard";
import { useLoadStore } from "../../../store/useLoadStore";
import { useEffect } from "react";

function UserLoadListing({ userDetails }) {
  const { userLoads, loading, error, getUserLoads } = useLoadStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const userToken = localStorage.getItem("authToken");
        const userId = userDetails?.user_id;
        await getUserLoads(userId, userToken);
      } catch (error) {
        console.error("Error Fetching Enquiries Related Data", error);
      }
    };
    fetchData();
  }, [getUserLoads]);

  console.log(userDetails, userLoads.data);

  return (
    <div className="flex flex-col gap-2 ">
      {userLoads?.data?.map((load) => (
        <div key={load.load_id}>
          <LoadCard load={load} userDetails={userDetails} />
        </div>
      ))}
    </div>
  );
}

export default UserLoadListing;
