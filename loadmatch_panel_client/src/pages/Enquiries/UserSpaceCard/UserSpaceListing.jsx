import React from "react";
import SpaceCard from "./SpaceCard";
import { useSpaceStore } from "../../../store/useSpaceStore";
import { useEffect } from "react";

function UserSpaceListing({ userDetails }) {
  const { userSpaces, loading, error, getUserSpaces } = useSpaceStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const userToken = localStorage.getItem("authToken");
        const userId = userDetails?.user_id;
        await getUserSpaces(userId, userToken);
      } catch (error) {
        console.error("Error Fetching Enquiries Related Data", error);
      }
    };
    fetchData();
  }, [getUserSpaces]);

  return (
    <div className="flex flex-col gap-2 ">
      {userSpaces.data?.map((space) => (
        <div key={space.space_id}>
          <SpaceCard space={space} userDetails={userDetails} />
        </div>
      ))}
    </div>
  );
}

export default UserSpaceListing;
