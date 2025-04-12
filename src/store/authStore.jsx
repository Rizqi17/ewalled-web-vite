import { create } from "zustand";

// Check for persisted user
const storedUser = localStorage.getItem("user");

const useAuthStore = create((set) => ({
  user: storedUser ? JSON.parse(storedUser) : null,

  setUser: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));

export default useAuthStore;
