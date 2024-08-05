import React from "react";
import { Tabs } from "antd";
import LeadsForm from "./LeadsForm/LeadsForm";
import LeadPostForm from "./LeadPostForm/LeadPostForm";
import LeadStatus from "./LeadStatus/LeadStatus";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Leads",
    children: <LeadsForm />,
  },
  {
    key: "2",
    label: "Leads + Post",
    children: <LeadPostForm />,
  },
  {
    key: "3",
    label: "My Leads",
    children: <LeadStatus />,
  },
];

function LeadDashBoard() {
  return (
    <ContentWrapper>
      <div className="mx-5  flex justify-center  ">
        <div>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>
    </ContentWrapper>
  );
}

export default LeadDashBoard;
