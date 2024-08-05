import React, { useEffect, useState } from "react";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import dayjs from "dayjs";
import { Carousel } from "antd";
import { useEnquiryStore } from "../../../store/useEnquiryStore";
import { getLoadById } from "../../../services/loadServices";
import { getSpaceById } from "../../../services/spaceServices";
import LoadCard from "../../Home/components/EnquiryCard/LoadCard";
import SpaceCard from "../../Home/components/EnquiryCard/SpaceCard";
import { message } from "antd";

function EnquiryCard({ enquiryData }) {
  console.log(enquiryData);
  const spaceId = enquiryData.for_space_id;
  const loadId = enquiryData.for_load_id;

  const { modifyEnquiryStatus } = useEnquiryStore();
  const [enquiryLoadData, setEnquiryLoadData] = useState({});
  const [enquirySpaceData, setEnquirySpaceData] = useState({});
  const [enquiryStatus, setEnquiryStatus] = useState(enquiryData.status);
  console.log(enquiryLoadData, enquirySpaceData);
  const userToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchEnquiryLoadData = async () => {
      try {
        const resData = await getLoadById(loadId,userToken);
        console.log(resData.data);
        setEnquiryLoadData(resData.data);
      } catch (error) {
        console.error("Error fetching booked load data:", error);
      }
    };
    const fetchEnquirySpaceData = async () => {
      try {
        const resData = await getSpaceById(spaceId,userToken);
        console.log(resData);
        setEnquirySpaceData(resData);
      } catch (error) {
        console.error("Error fetching booked load data:", error);
      }
    };
    fetchEnquiryLoadData();
    fetchEnquirySpaceData();
  }, [loadId, spaceId]);

  const handleConfirmEnquiry = async () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const userToken = localStorage.getItem("authToken");
    const enquiryId = enquiryData?.enquiry_id;
    console.log(enquiryId, userToken, `dasfsf`);
    try {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      const userToken = localStorage.getItem("authToken");
      const enquiryId = enquiryData?.enquiry_id;
      console.log(enquiryId, userToken, `dasfsf`);
      await modifyEnquiryStatus(enquiryId, userToken);
      setEnquiryStatus("confirmed");
      message.success("Successfully Booked Enquiry. We Will be Reach You Soon");
    } catch (error) {
      console.error("Failed to create enquiry", error);
      message.error("Failed to create enquiry. Please try again later.");
    }
  };

  return (
    <ContentWrapper>
      {" "}
      <div className="flex flex-col items-center  shadow-md border p-1 rounded-xl  transition-all">
        <div className="flex justify-around flex-row w-full  items-center mt-2 ">
          <LoadCard load={enquiryLoadData} />
          <SpaceCard space={enquirySpaceData} />
        </div>
        {enquiryStatus === "pending" ? (
          <div className="flex flex-col items-center w-full px-3 ">
            {" "}
            <span className="rounded-full  text-white w-full text-center bg-red-500  px-4">
              pending
            </span>
            <button
              className=" px-2 py-2 w-full  text-white  font-semibold bg-gradient-to-l from-green-400 via-green-400 to-green-500 text-xs mx-auto rounded-lg my-2 outline-none active:scale-95  "
              onClick={handleConfirmEnquiry}
            >
              Confirm Enquiry
            </button>{" "}
          </div>
        ) : (
          <div className="flex flex-col items-center w-full  ">
            <span className="rounded-full text-white w-full text-center bg-green-400 py-0.5 px-4">
              Confirmed
            </span>
          </div>
        )}
      </div>
    </ContentWrapper>
  );
}

export default EnquiryCard;
