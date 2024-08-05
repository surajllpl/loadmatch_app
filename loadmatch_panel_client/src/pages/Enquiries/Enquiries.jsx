import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import UserLoadListing from "./UserLoadCard/UserLoadListing";
import UserSpaceListing from "./UserSpaceCard/UserSpaceListing";
import EnquiryListing from "./UserEnquiryCard/EnquiryListing";
import "./styles.css";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import { useEnquiryStore } from "../../store/useEnquiryStore";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function Enquiries() {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const { TabPane } = Tabs;
  const { userEnquiries } = useEnquiryStore();

  const activeEnquiriesCount = userEnquiries?.data?.filter(
    (enquiry) => enquiry.status === "pending"
  ).length;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  return (
    <ContentWrapper>
      <div className="bg-[#f4f4f4] relative min-h-[100vh] rounded-t-3xl mt-16 px-1 pt-1">
        <div
          onClick={() => {
            navigate("/home");
          }}
          className="bg-gray-50 px-1 py-1 active:scale-95 absolute top-[-42px] left-[14px] rounded-xl  border shadow-sm"
        >
          <button className="text-xs rounded-xl bg-[#fff] px-4 py-2 text-green-600 active:scale-95">
            <FaArrowLeft />
          </button>
        </div>{" "}
        <div className="relative  rounded-t-3xl mt-1  min-h-[100vh] mx-1 px-2 py-1 bg-white  ">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Enquiries" key="1">
              <EnquiryListing userDetails={userDetails} />
            </TabPane>
            <TabPane tab="My Spaces" key="2">
              <UserSpaceListing userDetails={userDetails} />
            </TabPane>
            <TabPane tab="My Loads" key="3">
              <UserLoadListing userDetails={userDetails} />
            </TabPane>
          </Tabs>
          {activeEnquiriesCount > 0 && (
            <div className="text-white absolute px-1 top-3 left-16 text-xs bg-red-600 rounded-full">
              {activeEnquiriesCount}
            </div>
          )}
        </div>
      </div>
    </ContentWrapper>
  );
}

export default Enquiries;
