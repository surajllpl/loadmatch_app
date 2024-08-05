import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import { Collapse, Divider } from "antd";
import BookedLoadCard from "./BookedLoadCard";
import "./style.css";
import ConfirmationForm from "./ConfirmationForm";
import { createEnquiry } from "../../../services/enquiryService";
import { message } from "antd";

export default function LoadBookingPage() {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const location = useLocation();
  const { newSpaceAdded, loadData } = location.state;
  // console.log(newSpaceAdded, loadData);
  const spaceData = newSpaceAdded.data.space;
  const { loadId } = useParams();
  const enquiryData = {
    by_user_id: userDetails.user_id,
    to_user_id: loadData.created_by,
    for_load_id: loadData.load_id,
    for_space_id: spaceData.space_id,
  };

  const navigate = useNavigate();
  const handleConfirmation = async () => {
    try {
      await createEnquiry(enquiryData);
      message.success("Successfully Booked Enquiry. We Will be Reach You Soon");
      navigate("/home", { replace: true });
    } catch (error) {
      console.log(error);
      if (error) {
        console.log(error);
        message.error(error);
      } else {
        message.error("Failed to create enquiry. Please try again later.");
      }
    }
  };

  return (
    <div className="bg-white min-h-screen mt-[-20px]">
      <div className="bgSvgLoad"></div>
      <ContentWrapper>
        <div className="p-2">
          <h1
            className=" text-center pt-8 p-5 text-green-700 pb-0 rounded-xl mb-2 bg-[#f4f4f4] font-semibold leading-7 text-md "
            style={{ textShadow: "rgba(0, 0, 0, 0.25)" }}
          >
            Review Your Booking
          </h1>{" "}
          <div className="w-full mx-auto md:px-12 flex flex-col gap-4 md:gap-8 md:flex-row">
            <div className="details w-full  basis-[60%]">
              <BookingInfo BookedloadDetails={loadData} />
            </div>
          </div>
          <div className="w-full mx-auto md:px-12 flex flex-col gap-4 md:gap-8 md:flex-row">
            <div className="details w-full  basis-[60%]">
              <ConfirmationFormDetails
                formData={spaceData}
                userDetails={userDetails}
              />
            </div>{" "}
          </div>
          <div className="mx-1 m-2">
            <button
              className=" col-span-3 px-2  py-1 bg-green-400 w-full  text-white font-semibold bg-gradient-to-l from-green-300 via-green-400 to-green-500 text-md  rounded-lg  outline-none active:scale-95  "
              onClick={handleConfirmation}
            >
              Confirm Enquiry
            </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

const BookingInfo = ({ BookedloadDetails }) => {
  // Check if BookedloadDetails exists before accessing its properties
  return (
    <>
      <div className="mx-1 font-bold">
        {BookedloadDetails && (
          <Collapse
            size="small"
            defaultActiveKey={["1"]}
            items={[
              {
                key: "1",
                label: "Booked Load Details",
                children: <BookedLoadCard load={BookedloadDetails} />,
              },
            ]}
          />
        )}
      </div>
    </>
  );
};
const ConfirmationFormDetails = ({ formData, userDetails }) => {
  // Check if BookedloadDetails exists before accessing its properties
  return (
    <>
      <div className="mx-1 font-bold mt-5">
        {formData && (
          <Collapse
            size="small"
            // defaultActiveKey={["1"]}
            items={[
              {
                key: "1",
                label: "Confirm Your Details",
                children: (
                  <ConfirmationForm
                    space={formData}
                    userDetails={userDetails}
                  />
                ),
              },
            ]}
          />
        )}
      </div>
    </>
  );
};
