import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Carousel } from "antd";
import { message } from "antd";
import ContentWrapper from "../../../../components/ContentWrapper/ContentWrapper";
import { getSpaceById } from "../../../../services/spaceServices";
import { getLoadById } from "../../../../services/loadServices";
import LoadCard from "../EnquiryCard/LoadCard";
import SpaceCard from "../EnquiryCard/SpaceCard";
import { modifyEnquiryStatus } from "../../../../services/enquiryService";

function HomeEnquiryCard({ enquiryData }) {
  const spaceId = enquiryData.for_space_id;
  const loadId = enquiryData.for_load_id;

  const [enquiryLoadData, setEnquiryLoadData] = useState({});
  const [enquirySpaceData, setEnquirySpaceData] = useState({});
  const userToken = localStorage.getItem("authToken");
  useEffect(() => {
    const fetchEnquiryLoadData = async () => {
    
      try {
        const resData = await getLoadById(loadId,userToken);
        // console.log(resData.data);
        setEnquiryLoadData(resData.data);
      } catch (error) {
        console.error("Error fetching booked load data:", error);
      }
    };
    const fetchEnquirySpaceData = async () => {
      try {
        const resData = await getSpaceById(spaceId,userToken);
        // console.log(resData);
        setEnquirySpaceData(resData);
      } catch (error) {
        console.error("Error fetching booked load data:", error);
      }
    };
    fetchEnquiryLoadData();
    fetchEnquirySpaceData();
  }, [loadId, spaceId]);

  return (
    <ContentWrapper>
      {" "}
      <div className="flex flex-col items-center shadow-md border p-1 rounded-xl  transition-all">
        <div className="flex justify-center items-center mt-2 ">
          <LoadCard load={enquiryLoadData} />
          <SpaceCard space={enquirySpaceData} />
        </div>
      </div>
    </ContentWrapper>
  );
}

export default HomeEnquiryCard;
