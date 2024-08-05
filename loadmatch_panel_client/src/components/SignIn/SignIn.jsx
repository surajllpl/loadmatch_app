import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn } = useAuthStore();
  const [sdkLoaded, setSdkLoaded] = useState(false);
  useEffect(() => {
    // Ensure the SDK is loaded
    const script = document.createElement("script");
    script.src = "https://otpless.com/v2/auth.js";
    script.type = "text/javascript";
    script.async = true;
    script.setAttribute("data-appid", import.meta.env.VITE_OTPLESS_APP_ID);
    script.onload = () => setSdkLoaded(true);
    document.body.appendChild(script);

    window.otpless = async (otplessUser) => {
      console.log(otplessUser.token, "before signIn");
      console.log(otplessUser);
      const token = otplessUser.token;
      console.log(token);
      const response = await signIn(token);
      console.log(response);
      if (response.success) {
        // alert("User authenticated successfully!");

        // Access specific user information
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
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-[100vh] bg-white flex justify-center ">
      <div className="flex justify-center mt-14 mx-2 ">
        <div id="otpless-login-page" className=""></div>
      </div>
    </div>
  );
};

export default SignIn;
