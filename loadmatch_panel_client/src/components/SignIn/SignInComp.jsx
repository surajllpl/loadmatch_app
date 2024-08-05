import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import "./style.css";

const SignInComp = () => {
  const navigate = useNavigate();
  const { signIn } = useAuthStore();
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [otplessUserLoaded, setOtplessUserLoaded] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "otpless-sdk";
    script.src = "https://otpless.com/v2/auth.js";
    script.type = "text/javascript";
    script.async = true;
    script.setAttribute("data-appid", import.meta.env.VITE_APP_OTPLESS_APP_ID);
    script.onload = () => {
      console.log("SDK loaded");
      setSdkLoaded(true);
      window.otpless = async (otplessUser) => {
        console.log("window.otpless called", otplessUser);
        setOtplessUserLoaded(true);

          const { token, userId, identities } = otplessUser;
          console.log("Token:", token);
          console.log("UserId:", userId);
          console.log("Identities:", identities);
          const response = await signIn(token);
          console.log(response, "response after approval");
          if (response.success) {
            const userDetails = response.user;
            console.log("User ID:", userDetails.user_id);
            console.log("Name:", userDetails.name);
            console.log("Email:", userDetails.email);
            console.log("Phone Number:", userDetails.phone_number);

            navigate("/home");
          } else {
            console.error(response.error);
          }
        
    };
  }
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [navigate, signIn]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-[100vh] bg-white flex justify-center items-center">
      {!sdkLoaded ? (
        <div className="flex justify-center items-center">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[95vh] md:h-[full] w-[99vw] md:w-[full] mx-2 ">
          <div id="otpless-login-page" className=""></div>
        </div>
      )}
    </div>
  );
};

export default SignInComp;
