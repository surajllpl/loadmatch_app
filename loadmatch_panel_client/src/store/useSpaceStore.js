import { create } from "zustand";
import {
  getSpaceSearchListing,
  getSpaceAllListings,
  getUserSpaces,
  getSpaceById,
} from "../services/spaceServices";

export const useSpaceStore = create((set) => ({
  spaces: [],
  userSpaces: [],
  userSearchedSpaces: [],
  loading: false,
  error: null,

  setSpaces: (newSpaces) => set({ spaces: newSpaces }),

  setUserSpaces: (newUserSpaces) => set({ userSpaces: newUserSpaces }),

  setUserSearchedSpaces: (newUserSearchedSpaces) =>
    set({ userSearchedSpaces: newUserSearchedSpaces }),

  getSpaceSearchListing: async (
    fromCity,
    toCity,
    userId,
    token,
    page = 1,
    pageSize = 10
  ) => {
    set({ loading: true });
    try {
      const spaces = await getSpaceSearchListing(
        fromCity,
        toCity,
        userId,
        token,
        page,
        pageSize
      );
      set({ userSearchedSpaces: spaces, loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  getSpaceAllListings: async (userId,token, page = 1, pageSize = 10) => {
    set({ loading: true });
    try {
      const spaces = await getSpaceAllListings(userId,token, page, pageSize);
      set({ spaces, loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  getUserSpaces: async (userId, token) => {
    set({ loading: true });
    try {
      const userSpaces = await getUserSpaces(userId, token);
      set({ userSpaces, loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  getSpaceById: async (spaceId) => {
    set({ loading: true });
    try {
      const space = await getSpaceById(spaceId);
      set({ loading: false, error: null });
      return space;
    } catch (error) {
      set({ loading: false, error: error.message });
      return null;
    }
  },
}));
