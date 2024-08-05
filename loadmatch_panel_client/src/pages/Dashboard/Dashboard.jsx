import React from "react";

const Dashboard = () => {
  console.log("from Dashboard",localStorage.getItem("authTokenTest"));
  console.log(localStorage.getItem("userDetailsTest")); 

  return <div>Dashboard Page</div>;
};

export default Dashboard;
