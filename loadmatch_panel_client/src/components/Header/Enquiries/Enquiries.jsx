import React from "react";
import { NavLink } from "react-router-dom";
import { PiBagBold } from "react-icons/pi";

function Enquiries({ userEnquiries }) {
  // console.log(userEnquiries?.data);
  const activeEnquiriesCount = userEnquiries?.data?.filter(
    (enquiry) => enquiry.status === "pending"
  ).length;

  return (
    <NavLink
      to={"/enquiries"}
      className="flex items-center shrink-0 mr-2 max-sm:flex-col max-sm:justify-center "
    >
      <div className="logo-trip logos-nav w-6 h-5 relative ">
        {activeEnquiriesCount > 0 && (
          <div className="text-white absolute px-1 top-[-5px] right-0 text-xs bg-red-600 rounded-full">
            {activeEnquiriesCount}
          </div>
        )}
      </div>
      <div className="text mr-5 max-sm:mr-0">
        <div className="font-semibold text-xs md:text-xs text-slate-600 ">
          Enquires
        </div>
        <div className="font-semibold text-xs md:text-xs text-slate-600 max-sm:hidden">
          Manage Booking
        </div>
      </div>
    </NavLink>
  );
}

export default Enquiries;
