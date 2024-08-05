import React, { useState } from "react";
import Inputbox from "../../../components/SmallComponents/BasicInputBox/Inputbox";
import { Carousel } from "antd";

function ConfirmationForm({ space, userDetails }) {
  console.log(space);

  const { stop_1, stop_2, stop_3, stop_4, stop_5, stop_6 } = space;
  const stops = [stop_1, stop_2, stop_3, stop_4, stop_5, stop_6].filter(
    (item) => item
  );
  return (
    <>
      <div className=" rounded-xl">
        <h1 className="text-center text-gray-600 pb-2 px-2">
          Load Booked For Your
        </h1>
        <Carousel className="h-[140px]  rounded-lg overflow-hidden   my-0.5">
          {space?.image_urls?.map((image) => (
            <img
              key={image}
              src={image}
              alt="img"
              className="aspect-square h-full m-auto shrink-0 object-cover"
            />
          ))}
        </Carousel>

        <div className="flex flex-col justify-center   items-center w-full">
          <div className="flex flex-col border-b text-center w-full h-[50px] bg-orange-50 rounded-t-lg">
            <div className="ml-2 flex justify-center items-center flex-col">
              <p className="text-[8px] text-left text-gray-400">Pickup Point</p>
              <p className="font-semibold text-[10px]">{space.from_city}</p>
              <p className="text-[10px] text-gray-500">{space.from_pin}</p>
            </div>
          </div>{" "}
          {stops.length !== 0 ? (
            <div className="flex gap-4 w-full">
              <div className="text-slate-500 text-[8px] font-semibold text-center w-full">
                <div className="bg-slate-50 leading-3  py-0.5 rounded-t-md px-2">
                  Stops
                </div>
                <div className="text-[8px]">{stops.join(", ")}</div>
              </div>
            </div>
          ) : (
            <div className="text-center text-[10px] text-gray-400">
              Non-Stop
            </div>
          )}
          <div className="flex flex-col border-t rounded-t-none text-center w-full h-[50px] bg-yellow-50 rounded-b-lg">
            <div className="ml-2 flex justify-center items-center flex-col">
              <p className="text-[8px] text-left text-gray-400">
                Drop-off Point
              </p>
              <p className="font-semibold text-[10px]">{space.to_city}</p>
              <p className="text-[10px] text-gray-500">{space.to_pin}</p>
            </div>
          </div>
        </div>

        <div className="mt-1 p-1 flex gap-4">
          <div className="text-slate-500 text-[10px] w-full font-semibold text-center">
            <div className="bg-slate-50 leading-3 border-b py-0.5 rounded-t-md px-2">
              Size <span className="text-[8px]">(W×H×L)</span>
            </div>
            <div className="text-[8px]">{`${space.width}×${space.height}×${space.length} ft`}</div>
          </div>
          <div className="mb-1 leading-3 text-slate-500 text-[10px]  w-full font-semibold text-center">
            <div className="bg-slate-50 leading-3 border-b py-0.5 rounded-t-md px-2">
              Weight <span className="text-[8px]">(tonnes)</span>
            </div>
            <div className="text-[8px]">{`${space.weight} tons`}</div>
          </div>
        </div>
      </div>
      <div>
        <Inputbox
          label="Contact No"
          onChange={() => {}}
          value={userDetails.contact}
          readOnly
        />
      </div>
    </>
  );
}

export default ConfirmationForm;
