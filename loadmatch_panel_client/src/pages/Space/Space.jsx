import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { IoAddOutline } from "react-icons/io5";
import AddSpace from "./AddSpace/AddSpace";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Space() {
  const [showForm, setShowForm] = useState(true);
  useEffect(() => {
    // window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  return (
    <ContentWrapper>
      <div className=" bg-[#f4f4f4] min-h-screen relative  rounded-t-3xl mt-12 p-1 ">
        <div className="mb-10 rounded-3xl m-1 p-1 bg-white  shadow-md ">
          <div
            onClick={() => {
              navigate("/home");
            }}
            className="bg-gray-50 px-1 py-1 active:scale-95 absolute top-[-16px] left-[25px] rounded-xl  border shadow-sm"
          >
            <button className="text-xs rounded-xl bg-[#fff] px-4 py-2 text-green-600 active:scale-95">
              <FaArrowLeft />
            </button>
          </div>{" "}
          <div
            className="flex justify-center items-center
          p-2 m-2 "
          >
            <p className="text-[16px]  uppercase font-mono font-thin ">
              Add Space For Booking Shipments{" "}
            </p>
          </div>
          {showForm && (
            <div className="">
              <AddSpace setShowForm={setShowForm} />
            </div>
          )}{" "}
        </div>
      </div>
    </ContentWrapper>
  );
}

export default Space;
