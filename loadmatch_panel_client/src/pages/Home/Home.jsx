import React, { useState, useEffect } from "react";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
// import CarouselHome from "./components/CarouselHome/CarouselHome";
import { lorryLogo, loadLogo, spaceLogo } from "../../assets";
// import HomeSearchPanel from "./HomeSearch/HomeSearchPanel";
// import GoogleMapUse from "./HomeSearch/GoogleMapUse";
import HeroButton from "./components/HeroButton";
import HomeSearchPanel from "./HomeSearch/HomeSearchPanel";
import CarouselHome from "./components/CarouselHome/CarouselHome";

function Home() {
  const {
    isLoggedIn,
    authToken,
    userDetails,
    loading,
    setIsLoggedIn,
    setAuthToken,
    setUserDetails,
    setLoading,
  } = useAuthStore();
  // console.log("from Dashboard",localStorage.getItem("authToken"));
  // console.log(localStorage.getItem("userDetails")); 
  // console.log(isLoggedIn,authToken,userDetails,loading); 

  const navigate = useNavigate();
  const handleLoads = () => {
    navigate(`/add-load`);
  };
  const handleSpaces = () => {
    navigate(`/add-space`);
  };
  const [expanded, setExpanded] = useState(false);
  const [hsource, setHSource] = useState("");
  const [hdestination, setHDestination] = useState("");
  return (
    <ContentWrapper>
      <div className="">
        <div className="">
          {" "}
          {/* {expanded && (
            <GoogleMapUse hsource={hsource} hdestination={hdestination} />
          )} */}
        </div>
        <div>
          <div>
            <HomeSearchPanel
              hsource={hsource}
              hdestination={hdestination}
              setHSource={setHSource}
              setHDestination={setHDestination}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          </div>
          <div className="mt-4 rounded-t-3xl h-min-screen bg-[#f4f4f4] border">
            <div className="p-2 rounded-3xl">
              <div className="p-1 bg-white rounded-3xl">
                <HeroButton
                  handleLoads={handleLoads}
                  handleSpaces={handleSpaces}
                />{" "}
              </div>
            </div>{" "}
            <CarouselHome />
          </div>
        </div>
      </div>{" "}
    </ContentWrapper>
  );
}

export default Home;
