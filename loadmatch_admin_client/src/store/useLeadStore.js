import { create } from "zustand";
import { getAllLeadsByAgentId } from "../services/leadServices";

const useLeadStore = create((set) => ({
  agentsLeads: [],
  loading: false,
  error: null,

  fetchLeadsByAgentId: async (agentId, token) => {
    set({ loading: true, error: null });
    try {
      console.log(agentId, token);
      const data = await getAllLeadsByAgentId(agentId, token);
      console.log(data);
      set({ agentsLeads: data.data.data, loading: false });
    } catch (error) {
      console.error("Error fetching leads:", error);
      set({ error: "Failed to fetch leads", loading: false });
    }
  },
}));

export default useLeadStore;
