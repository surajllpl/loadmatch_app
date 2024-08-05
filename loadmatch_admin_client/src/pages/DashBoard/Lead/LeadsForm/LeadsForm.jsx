import React from "react";
import LeadsGen from "./LeadsGen";
import WhatsappForm from "./WhatsappForm";
import LeadsLogin from "./LeadsLogin";

function LeadsForm() {
  return (
    <div className="flex justify-center items-center flex-col ">
      <LeadsGen />
      <WhatsappForm />
      <LeadsLogin />
    </div>
  );
}

export default LeadsForm;
