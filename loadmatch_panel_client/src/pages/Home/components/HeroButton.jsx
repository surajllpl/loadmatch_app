import React from "react";
import { lorryLogo, loadLogo, spaceLogo } from "../../../assets";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FiPackage } from "react-icons/fi";
function HeroButton({ handleLoads, handleSpaces }) {
  return (
    <>
      <p className="font-bold text-md text-green-600 px-2 py-1">
        Select Services
      </p>
      <div className="mx-2 mb-2 flex gap-4 ">
        <button
          className="bg-green-400  shadow-md flex-1 h-[120px] flex flex-col gap-0.5 justify-center items-center rounded-xl transition-smooth transform active:scale-95 active:shadow-xl bg-gradient-to-r from-green-600 via-green-500 to-green-500  hover:from-green-600 hover:to-green-400"
          onClick={handleLoads}
        >
          <div className="h-[50px] w-[50px] my-1">
          <FiPackage  className=" h-[50px] w-[50px] p-2  rounded-full text-green-800  mt-1 bg-white" />
          </div>
          <div>
          <p className="text-md  font-extrabold text-[14px] text-white">
            Shipping
          </p>
          <p className="text-xs flex flex-col leading-4 mb-1">
            <span className="text-center text-[12px] text-white">
              Send,Fetch,Sell
            </span>
            <span className="text-center text-[12px] text-white">
              {" "}
              Your Goods
            </span>
          </p>
          </div>
        </button>
        <button
          className="bg-green-400  shadow-md flex-1 h-[120px] flex flex-col gap-0.5 justify-center items-center rounded-xl transition-smooth transform active:scale-95 active:shadow-xl bg-gradient-to-r from-green-600 via-green-500 to-green-500  hover:from-green-600 hover:to-green-400"
          onClick={handleSpaces}
        >
          <div className="h-[50px] w-[50px] my-1">
            <LiaShippingFastSolid className="  h-[50px] w-[50px] p-2  rounded-full text-green-800  mt-1 bg-white" />
            </div>
            <div>
          <p className="text-md  font-extrabold text-[14px] text-white">Movers</p>
          <p className="text-xs flex flex-col leading-4">
            <span className="text-center text-[12px] text-white">
              Moving and
            </span>
            <span className="text-center text-[12px] text-white">
              {" "}
              Shifting Goods
            </span>
          </p></div>
        </button>
      </div>
    </>
  );
}

export default HeroButton;
