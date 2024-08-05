import axiosInstancePanel from "./axiosInstance";

export const createLead = async (leadData, token) => {
  try {
    const response = await axiosInstancePanel.post("/lead-create", leadData, {
      params: {},
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating lead:", error);
    throw error;
  }
};

export const updateLead = async (leadData, token) => {
  try {
    const response = await axiosInstancePanel.patch("/lead-update", leadData, {
      params: {},
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating lead:", error);
    throw error;
  }
};

export const getAllLeadsByAgentId = async (agentId, token) => {
  try {
    console.log(agentId, token);
    const response = await axiosInstancePanel.get(`/lead-list/${agentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching leads:", error);
    throw error;
  }
};
