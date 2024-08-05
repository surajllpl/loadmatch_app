import { create } from "zustand";
import {
  createEnquiry,
  getAllEnquiries,
  getEnquiriesByUserId,
  modifyEnquiryStatus,
} from "../services/enquiryService";

export const useEnquiryStore = create((set) => ({
  allEnquiries: [],
  userEnquiries: [],
  loading: false,
  error: null,

  // Function to create an enquiry
  createEnquiry: async (enquiryData) => {
    set({ loading: true });
    try {
      const newEnquiry = await createEnquiry(enquiryData);
      set((state) => ({
        allEnquiries: [...state.allEnquiries, newEnquiry],
        loading: false,
        error: null,
      }));
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  // Function to fetch all enquiries
  getAllEnquiries: async (token) => {
    set({ loading: true });
    try {
      const allEnquiries = await getAllEnquiries(token);
      set({ allEnquiries, loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  // Function to fetch user-specific enquiries
  getEnquiriesByUserId: async (userId, token) => {
    set({ loading: true });
    try {
      const userEnquiries = await getEnquiriesByUserId(userId, token);
      set({ userEnquiries, loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  // Function to modify enquiry status
  modifyEnquiryStatus: async (enquiryId, token) => {
    set({ loading: true });
    try {
      const updatedEnquiry = await modifyEnquiryStatus(enquiryId, token);
      set((state) => ({
        allEnquiries: state.allEnquiries.map((enquiry) =>
          enquiry.id === enquiryId ? updatedEnquiry : enquiry
        ),
        loading: false,
        error: null,
      }));
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
}));
