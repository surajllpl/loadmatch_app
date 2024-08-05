// useAuthStore.js
import { create } from "zustand";
import * as authService from "../services/authService";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  authToken: null,
  userDetails: null,
  loading: true,

  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setAuthToken: (authToken) => set({ authToken }),
  setUserDetails: (userDetails) => set({ userDetails }),
  setLoading: (loading) => set({ loading }),

  init: async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        set({ authToken: token, isLoggedIn: true });
        // const userData = await authService.fetchUserData(token);
        const userData = localStorage.getItem("userDetails");
        set({ userDetails: userData });
        set({ loading: false });
      } else {
        set({ loading: false });
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
    }
  },

  signUp: async (userData) => {
    try {
      const data = await authService.signUp(userData);
      set({ isLoggedIn: true, authToken: data.auth, userDetails: data.user });
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  },

  signIn: async (token) => {
    try {
      const data = await authService.signIn(token);
      console.log("user store", data);
      set({
        isLoggedIn: true,
        authToken: data.authToken,
        userDetails: data.user,
      });
      return data;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  },
  logIn: async (userData) => {
    try {
      const data = await authService.logIn(userData);
      set({ isLoggedIn: true, authToken: data.auth, userDetails: data.user });
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  signOut: () => {
    authService.signOut();
    set({ isLoggedIn: false, authToken: null, userDetails: null });
  },
}));

export default useAuthStore;
