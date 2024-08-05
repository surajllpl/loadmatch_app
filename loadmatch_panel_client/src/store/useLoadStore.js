import { create } from "zustand";
import {
  getLoadSearchListings,
  getLoadAllListings,
  getUserLoads,
  getLoadById,
} from "../services/loadServices";

export const useLoadStore = create((set) => ({
  loads: [],
  userLoads: [],
  userSearchedLoads: [],
  loading: false,
  error: null,

  setLoads: (newLoads) => set({ loads: newLoads }),

  setUserLoads: (newUserLoads) => set({ userLoads: newUserLoads }),

  setUserSearchedLoads: (newUserSearchedLoads) =>
    set({ userSearchedLoads: newUserSearchedLoads }),

  getLoadSearchListings: async (
    fromCity,
    toCity,
    userId,
    token,
    page = 1,
    pageSize = 10
    
  ) => {
    
    set({ loading: true });
    console.log(token)

    try {
      const loads = await getLoadSearchListings(
        fromCity,
        toCity,
        userId,
        token,
        page,
        pageSize
       
      );
      set({ userSearchedLoads: loads, loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  getLoadAllListings: async (userId ,token, page = 1, pageSize = 10) => {
    set({ loading: true });
    try {
    
      const loads = await getLoadAllListings(page, pageSize, userId,token);
      set({ loads, loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  getUserLoads: async (userId, token) => {
    set({ loading: true });
    try {
      const userLoads = await getUserLoads(userId, token);
      set({ userLoads, loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  getLoadById: async (loadId) => {
    set({ loading: true });
    try {
      const load = await getLoadById(loadId);
      set({ loading: false, error: null });
      return load;
    } catch (error) {
      set({ loading: false, error: error.message });
      return null;
    }
  },
}));
