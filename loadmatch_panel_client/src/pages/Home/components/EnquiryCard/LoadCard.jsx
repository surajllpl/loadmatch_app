import React from "react";
import { Carousel } from "antd";
import dayjs from "dayjs";
import { MdLocationOn } from "react-icons/md";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { LuDot } from "react-icons/lu";
import { FaCircleDot } from "react-icons/fa6";

const LoadCard = ({ load }) => {
  return (
    <div
      className={`shrink-0  rounded-xl shadow-md   w-[150px]   mx-auto bg-white min-h-32 h-fit  grid grid-cols-1   shadow-green-50 `}
    >
      <div className="images h-fit w-[120px] ml-4 col-span-1  ">
        <Carousel className="h-full rounded-lg overflow-hidden my-0.5 ">
          {load?.image_urls?.map((image) => (
            <img
              key={image}
              src={image}
              alt="img"
              className="aspect-square h-full m-auto shrink-0"
            />
          ))}
        </Carousel>{" "}
      </div>
      <div className="details text-gray-800 mx-2  rounded-md py-1 col-span-2 flex flex-col gap-0.5 ">
        <div className="flex gap-0.5 w-full">
          <div className="flex flex-col justify-center items-center gap-0.5">
            <div className="  m-1 text-[10px] text-green-700">
              <FaLocationCrosshairs />
            </div>{" "}
            <div className=" mx-0.5 my-1 text-[10px]">
              <LuDot />
            </div>{" "}
            <div className="  mx-0.5 my-1 text-[8px] text-green-700">
              <FaCircleDot />
            </div>{" "}
            <div className=" mx-0.5 my-1 text-[10px]">
              <LuDot />
            </div>{" "}
            <div className="  mx-0.5 my-1  text-[10px] text-green-700">
              <MdLocationOn />
            </div>{" "}
          </div>
          <div className="flex flex-col mt-7 justify-center items-center w-[150px] ">
            <div className="flex flex-col  text-center w-full h-fit bg-green-50 rounded-t-lg">
              <div className="ml-2 flex justify-center items-center flex-col">
                <p className="text-[8px] text-left text-gray-400">
                  Pickup Point
                </p>
                <p className="font-semibold text-[10px]">{load?.from_city}</p>
                <p className="text-[10px] text-gray-500">{load?.from_pin}</p>
              </div>{" "}
            </div>{" "}
            <div className="flex flex-col border-t rounded-t-none text-center w-full  h-fit bg-lime-50 rounded-b-lg">
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
        </div>
      </div>
    </div>
  );
};

export default LoadCard;
