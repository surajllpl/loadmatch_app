import React from "react";
import { Carousel } from "antd";
import dayjs from "dayjs";
import { MdLocationOn } from "react-icons/md";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { LuDot } from "react-icons/lu";
import { FaCircleDot } from "react-icons/fa6";

const SpaceCard = ({ space }) => {
  const { stop_1, stop_2, stop_3, stop_4, stop_5, stop_6 } = space;
  const stops = [stop_1, stop_2, stop_3, stop_4, stop_5, stop_6].filter(
    (item) => item
  );

  return (
    <div className="shrink-0 p-2 rounded-xl shadow-md border w-full mx-auto bg-white min-h-32 h-fit grid grid-cols-3 active:scale-95 shadow-green-50">
      <div className="images h-fit col-span-1 ">
        <Carousel className="h-full rounded-lg overflow-hidden my-0.5">
          {space?.image_urls?.map((image) => (
            <img
              key={image}
              src={image}
              alt="img"
              className="aspect-square h-full m-auto shrink-0"
            />
          ))}
        </Carousel>
        <div className="col-span-2 px-3 py-1 mt-1 border-t mb-1 text-slate-500 text-[10px] font-semibold text-center row-span-1">
          <div className="text-[10px] text-slate-400">
            {dayjs(space.createdAt).format("ddd, DD MMM YYYY")}
          </div>
        </div>
        <div className="col-span-2 mb-1 text-white text-[10px] font-semibold text-center row-span-1">
          <div className="">
            {space?.active ? (
              <span className="rounded-full bg-green-400 py-0.5 px-4">
                Active
              </span>
            ) : (
              <span className="">InActive</span>
            )}
          </div>
        </div>
      </div>
      <div className="details text-gray-800 mx-2 rounded-md py-1 col-span-2 flex flex-col gap-0.5">
        <div className="flex gap-0.5 w-full">
          <div className="flex flex-col justify-center items-center gap-0.5">
            <div className="m-1 text-[10px] text-orange-700">
              <FaLocationCrosshairs />
            </div>
            <div className="mx-0.5 my-1 text-[10px]">
              <LuDot />
            </div>
            <div className="mx-0.5 my-1 text-[8px] text-orange-700">
              <FaCircleDot />
            </div>
            <div className="mx-0.5 my-1 text-[10px]">
              <LuDot />
            </div>
            <div className="mx-0.5 my-1 text-[10px] text-orange-700">
              <MdLocationOn />
            </div>
          </div>
          <div className="flex flex-col justify-center   items-center w-full">
            <div className="flex flex-col border-b text-center w-full h-[55px] bg-orange-50 rounded-t-lg">
              <div className="ml-2 flex justify-center items-center flex-col">
                <p className="text-[10px] text-left text-gray-400">
                  Pickup Point
                </p>
                <p className="font-semibold text-[12px]">{space.from_city}</p>
                <p className="text-[12px] text-gray-500">{space.from_pin}</p>
              </div>
            </div>{" "}
            {stops.length !== 0 ? (
              <div className="flex gap-4 w-full">
                <div className="text-slate-500 text-[12px] font-semibold text-center w-full">
                  <div className="bg-slate-50 leading-3  py-0.5 rounded-t-md px-2">
                    Stops
                  </div>
                  {/* <div className="text-[10px]">{stops.join(", ")}</div> */}
                </div>
              </div>
            ) : (
              <div className="text-center text-[10px] text-gray-400">
                Non-Stop
              </div>
            )}
            <div className="flex flex-col border-t rounded-t-none text-center w-full h-[55px] bg-yellow-50 rounded-b-lg">
              <div className="ml-2 flex justify-center items-center flex-col">
                <p className="text-[10px] text-left text-gray-400">
                  Drop-off Point
                </p>
                <p className="font-semibold text-[12px]">{space.to_city}</p>
                <p className="text-[12px] text-gray-500">{space.to_pin}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-1 p-1 ml-3 flex justify-center gap-4">
          <div className="text-slate-500 text-[12px] font-semibold text-center">
            <div className="bg-slate-50 leading-3 border-b py-0.5 rounded-t-md px-2">
              Size <span className="text-[12px]">(W×H×L)</span>
            </div>
            <div className="text-[12px]">{`${space.width}×${space.height}×${space.length} ft`}</div>
          </div>
          <div className="mb-1 leading-3 text-slate-500 text-[12px] font-semibold text-center">
            <div className="bg-slate-50 leading-3 border-b py-0.5 rounded-t-md px-2">
              Weight <span className="text-[12px]">(tonnes)</span>
            </div>
            <div className="text-[12px]">{`${space.weight} tons`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;
