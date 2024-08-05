import React, { useState, useEffect } from "react";
import Logo from "./Logo/Logo";
import "./style.css";
import Enquiries from "./Enquiries/Enquiries";
import { useEnquiryStore } from "../../store/useEnquiryStore";
import Profile from "./profile/Profile";  // Import the ProfileDropdown component

function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const { userEnquiries, getEnquiriesByUserId } = useEnquiryStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const userToken = localStorage.getItem("authToken");
        const userId = userDetails?.user_id;
        await getEnquiriesByUserId(userId, userToken);
      } catch (error) {
        console.error("Error Fetching Enquiries Related Data", error);
      }
    };
    fetchData();
  },
   [getEnquiriesByUserId]
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="w-full max-w-[1280px]  mx-auto sticky min-h-[6dvh] rounded-b-3xl h-14 top-0 shadow-2xl z-10">
      <div className="w-full max-w-[1280px] mx-auto h-full flex items-center rounded-b-3xl bg-white px-[10px] justify-between max-sm:px-1">
        <div className="flex items-center h-full">
          <Logo />
        </div>
        <div className="flex items-center">
          <div className="mr-4">
            <Enquiries userEnquiries={userEnquiries} />
          </div>
          <Profile /> 
          {/* Add the ProfileDropdown component */}
        </div>
      </div>
    </header>
  );
}

export default Header;
