import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import BookedSpaceCard from "./BookedSpaceCard";
import ConfirmationForm from "./ConfirmationForm";
import { Collapse, Divider } from "antd";
import { createEnquiry } from "../../../services/enquiryService";

function SpaceBookingPage() {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const location = useLocation();
  const { spaceId } = useParams();
  const { newLoadAdded, spaceData } = location.state;
  const loadData = newLoadAdded.data.newLoad;

  const enquiryData = {
    by_user_id: userDetails.user_id,
    to_user_id: spaceData.created_by,
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
              <BookingInfo BookedSpaceDetails={spaceData} />
            </div>
          </div>
          <div className="w-full mx-auto md:px-12 flex flex-col gap-4 md:gap-8 md:flex-row">
            <div className="details w-full  basis-[60%]">
              <ConfirmationFormDetails
                loadData={loadData}
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

export default SpaceBookingPage;

const BookingInfo = ({ BookedSpaceDetails }) => {
  return (
    <>
      <div className="mx-1 font-bold">
        {BookedSpaceDetails && (
          <Collapse
            size="small"
            defaultActiveKey={["1"]}
            items={[
              {
                key: "1",
                label: "Booked Movers Details",
                children: <BookedSpaceCard space={BookedSpaceDetails} />,
              },
            ]}
          />
        )}
      </div>
    </>
  );
};
const ConfirmationFormDetails = ({ loadData, userDetails }) => {
  return (
    <>
      <div className="mx-1 font-bold mt-5">
        {loadData && (
          <Collapse
            size="small"
            // defaultActiveKey={["1"]}
            items={[
              {
                key: "1",
                label: "Confirm Your Details",
                children: (
                  <ConfirmationForm load={loadData} userDetails={userDetails} />
                ),
              },
            ]}
          />
        )}
      </div>
    </>
  );
};
