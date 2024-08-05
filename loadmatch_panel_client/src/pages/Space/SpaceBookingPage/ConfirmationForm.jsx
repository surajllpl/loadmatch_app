import React, { useState } from "react";
import Inputbox from "../../../components/SmallComponents/BasicInputBox/Inputbox";
import { Carousel } from "antd";

function ConfirmationForm({ load, userDetails }) {
  return (
    <>
      <div className=" rounded-xl">
        <h1 className="text-center text-gray-600 pb-2 px-2">
          Your Added Shipment
        </h1>
        <Carousel className="h-[140px]  rounded-lg overflow-hidden   my-0.5">
          {load?.image_urls?.map((image) => (
            <img
              key={image}
              src={image}
              alt="img"
              className="aspect-square h-full m-auto shrink-0 object-cover"
            />
          ))}
        </Carousel>
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex flex-col  text-center w-full h-[50px]  bg-green-50 rounded-t-lg">
            <div className="ml-2 flex justify-center items-center flex-col">
              <p className="text-[8px] text-left text-gray-400">Pickup Point</p>
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
              <p className="text-[10px]  text-gray-500">{load?.to_pin}</p>{" "}
            </div>{" "}
          </div>
        </div>

        <div className="mt-1 p-1 flex gap-4">
          <div className=" text-slate-500  text-[10px] font-semibold w-full text-center">
            <div className="bg-slate-50 leading-3 border-b py-0.5 rounded-t-md px-2">
              Size <span className="text-[8px]">(W×H×L)</span>
            </div>{" "}
            <div className="text-[8px]">{`${load.width}×${load.height}×${load.length} ft`}</div>{" "}
          </div>
          <div className="mb-1  leading-3 text-slate-500 w-full text-[10px] font-semibold  text-center">
            <div className="bg-slate-50 leading-3 border-b py-0.5 rounded-t-md px-2">
              Weight <span className="text-[8px]">(tonnes)</span>
            </div>{" "}
            <div className="text-[8px]">{`${load.weight} tons`}</div>{" "}
          </div>
        </div>
      </div>
      <div>
        <Inputbox
          label="Contact No"
          onChange={() => {
            console.log("s");
          }}
          value={userDetails.contact}
          readOnly
        />
      </div>
    </>
  );
}

export default ConfirmationForm;
