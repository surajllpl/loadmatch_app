import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import dayjs from "dayjs";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import { MdLocationOn } from "react-icons/md";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { LuDot } from "react-icons/lu";
import { FaCircleDot } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

const LoadCard = ({ load }) => {
  const location = useLocation();0
  // console.log(location.state);
  const { newSpaceAdded } = location.state;
  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupImage, setPopupImage] = useState("");

  useEffect(() => {
    if (isPopupOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isPopupOpen]);

  const togglePopup = (image = "") => {
    setPopupImage(image);
    setPopupOpen(!isPopupOpen);
  };

  const handleBooking = () => {
    if (newSpaceAdded) {
      navigate(`/load/bookingv1/${load.load_id}`, {
        state: {
          newSpaceAdded,
          loadData: { ...load },
        },
      });
    } else {
      navigate(`/home/searchLoad/add-space`, {
        state: {
          loadData: { ...load },
        },
      });
    }
  };
  return (
    <ContentWrapper>
      <div className="shrink-0 p-1 rounded-xl shadow-md border  w-full mx-auto bg-white min-h-32 h-fit  grid grid-cols-3 shadow-green-50 ">
        <div className="images h-fit col-span-1  ">
          <Carousel className="h-full rounded-lg overflow-hidden my-0.5 ">
            {load?.image_urls?.map((image) => (
              <div
              onClick={() => togglePopup(image)}>
              <img
                key={image}
                src={image}
                alt="img"
                className="aspect-square h-full m-auto shrink-0"

              />
              </div>
            ))}
            
          </Carousel>{" "}
          {isPopupOpen && (
          <div className="fixed top-20 left-0 w-full h-[600px]  rounded-xl flex justify-center items-center z-50 bg-black bg-opacity-50">
            <div className="relative w-full m-1 rounded-xl h-full flex justify-center items-center">
              <img
                src={popupImage}
                alt="Popup Image"
                className="max-w-full h-[90%]  w-[90%] rounded-xl"
                onClick={togglePopup}
              />
              <button
                onClick={togglePopup}
                className="absolute top-1 right-0 bg-white rounded-full text-black  w-8 font-extrabold text-lg"
              >
                &times;
              </button>
            </div>
          </div>
        )}
          <div className="col-span-2  px-4 py-1 mt-1 border-t mb-1 text-slate-500 text-xs font-semibold  text-center row-span-1 ">
            <div className=" text-xs text-slate-400 ">
              {dayjs(load.updatedAt).format("ddd,DD, MMM YYYY")}
            </div>
          </div>
          <div className="col-span-2   mb-1 text-white text-[10px] font-semibold  text-center row-span-1 ">
            <div className=" text-[10px]  ">
              {load?.active ? (
                <>
                  <span className=" rounded-full  bg-green-400 py-0.5 px-4 ">
                    Active
                  </span>
                </>
              ) : (
                <>
                  <span className="">InActive</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="details text-gray-800 mx-2  rounded-md py-1 col-span-2 flex flex-col gap-0.5 ">
          <div className="flex gap-0.5 w-full">
            <div className="flex flex-col justify-center items-center gap-0.5">
              <div className="  m-1 text-[10px] text-green-500">
                <FaLocationCrosshairs />
              </div>{" "}
              <div className=" mx-0.5 my-1 text-[10px] text-gray-500">
                <LuDot />
              </div>{" "}
              <div className="  mx-0.5 my-1 text-[8px] text-green-500">
                <FaCircleDot />
              </div>{" "}
              <div className=" mx-0.5 my-1 text-[10px] text-gray-500">
                <LuDot />
              </div>{" "}
              <div className="  mx-0.5 my-1  text-[10px] text-green-500">
                <MdLocationOn />
              </div>{" "}
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              <div className="flex flex-col  text-center w-full h-[50px]  bg-green-50 rounded-t-lg">
                <div className="ml-2 flex justify-center items-center flex-col">
                  <p className="text-[8px] text-left text-gray-400">
                    Pickup Point
                  </p>
                  <p className="font-semibold text-[10px]">{load?.from_city}</p>
                  <p className="text-[10px] text-gray-500">{load?.from_pin}</p>
                </div>{" "}
              </div>{" "}
              <div className="flex flex-col border-t rounded-t-none text-center w-full h-[50px]  bg-lime-50 rounded-b-lg">
                <div className="ml-2 flex justify-center items-center flex-col">
                  <p className="text-[8px] text-left text-gray-400">
                    Drop-off Point
                  </p>
                  <p className="font-semibold text-[10px]">{load?.to_city}</p>
                  <p className="text-[10px]  text-gray-500">
                    {load?.to_pin}
                  </p>{" "}
                </div>{" "}
              </div>
            </div>
          </div>
          <div className="mt-1 p-1 flex gap-4">
            <div className=" text-slate-500  text-[10px] font-semibold  text-center">
              <div className="bg-slate-50 leading-3 border-b py-0.5 rounded-t-md px-2">
                Size <span className="text-[8px]">(W×H×L)</span>
              </div>{" "}
              <div className="text-[8px]">{`${load.width}×${load.height}×${load.length} ft`}</div>{" "}
            </div>
            <div className="mb-1  leading-3 text-slate-500  text-[10px] font-semibold  text-center">
              <div className="bg-slate-50 leading-3 border-b py-0.5 rounded-t-md px-2">
                Weight <span className="text-[8px]">(tonnes)</span>
              </div>{" "}
              <div className="text-[8px]">{`${load.weight} tons`}</div>{" "}
            </div>
          </div>{" "}
          <button
            onClick={handleBooking}
            className=" col-span-2 px-2  py-1 bg-green-400 w-full  text-white font-semibold bg-gradient-to-l from-green-300 via-green-400 to-green-500 text-xs  rounded-lg  outline-none active:scale-95  "
          >
            Book Enquiry
          </button>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default LoadCard;
