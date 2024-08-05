import React, { useEffect, useState } from "react";
import useLeadStore from "../../../../store/useLeadStore";
import { updateLead } from "../../../../services/leadServices";
import { message, Select } from "antd";
import { FaEdit } from "react-icons/fa";

const LeadsList = () => {
  const { agentsLeads, loading, error, fetchLeadsByAgentId } = useLeadStore();
  const [editingLeadId, setEditingLeadId] = useState(null);
  const [newProfileStatus, setNewProfileStatus] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      const agentDetail = JSON.parse(localStorage.getItem("agentDetail"));
      const token = JSON.parse(localStorage.getItem("token"));
      console.log(token);
      await fetchLeadsByAgentId(agentDetail.agent_id, token);
    };

    fetchLeads();
  }, [fetchLeadsByAgentId]);

  const handleProfileStatusChange = async (status, leadId) => {
    setNewProfileStatus(status);
    try {
      await updateStatus({ lead_id: leadId, profile_status: status });
      message.success("Lead updated successfully!");
    } catch (error) {
      message.error("Error updating lead.");
    }
    setEditingLeadId(null);
  };
  return (
    <div className="w-full">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {agentsLeads.length > 0 ? (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300 bg-gray-50">Name</th>
              <th className="p-2 border border-gray-300 bg-gray-50">Contact</th>
              <th className="p-2 border border-gray-300 bg-gray-50">
                Reference
              </th>
              <th className="p-2 border border-gray-300 bg-gray-50  flex flex-col ">
                <div className=""> Current</div>
                <div className=""> Status</div>
              </th>{" "}
              <th className="p-2 border border-gray-300 bg-gray-50   ">
                <div className=""> Login</div>
                <div className=""> Status</div>
              </th>{" "}
              <th className="p-2 border border-gray-300 bg-gray-50">
                <div className=""> Post</div>
                <div className=""> Status</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {agentsLeads.map((lead) => (
              <tr key={lead.lead_id}>
                <td className="p-2 border border-gray-300">{lead.name}</td>
                <td className="p-2 border border-gray-300">{lead.contact}</td>
                <td className="p-2 border border-gray-300">
                  {lead.reference_group}
                </td>
                <td className="p-2 border border-gray-300">
                  {editingLeadId === lead.lead_id ? (
                    <Select
                      value={newProfileStatus}
                      onChange={(value) =>
                        handleProfileStatusChange(value, lead.lead_id)
                      }
                      style={{ width: "100px" }}
                    >
                      <Option value="first_lead">First Lead</Option>
                      <Option value="first_message">First Message</Option>
                      <Option value="first_call">First Call</Option>
                      <Option value="first_login">First Login</Option>
                      <Option value="second_call">Second Call</Option>
                      <Option value="first_post">First Post</Option>
                      <Option value="enq_call">Enquiry Call</Option>
                      <Option value="first_enq">First Enquiry</Option>
                      <Option value="not_interested">Not Interested</Option>
                    </Select>
                  ) : (
                    <div className="flex justify-between items-center gap-2">
                      <div className=" text-xs uppercase">
                        {lead.profile_status}
                      </div>
                      <button
                        onClick={() => {
                          setEditingLeadId(lead.lead_id);
                          setNewProfileStatus(lead.profile_status);
                        }}
                      >
                        <FaEdit />
                      </button>
                    </div>
                  )}
                </td>
                <td className="p-2 border border-gray-300">
                  {lead.profile_status !== "first_login" ? (
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-[10px] h-[10px] bg-red-600 rounded-full"></div>
                      <div className="font-thin text-xs uppercase">No</div>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-[10px] h-[10px] bg-green-600 rounded-full"></div>
                      <div className="font-thin text-xs uppercase">Yes</div>
                    </div>
                  )}
                </td>{" "}
                <td className="p-2 border border-gray-300">
                  {lead.profile_status !== "first_post" ? (
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-[10px] h-[10px] bg-red-600 rounded-full"></div>
                      <div className="font-thin text-xs uppercase">No</div>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-[10px] h-[10px] bg-green-600 rounded-full"></div>
                      <div className="font-thin text-xs uppercase">Yes</div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No leads available.</p>
      )}
    </div>
  );
};

export default LeadsList;
