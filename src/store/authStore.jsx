import { create } from "zustand";

// Check for persisted user & wallet
const storedData = localStorage.getItem("auth");
const parsedData = storedData ? JSON.parse(storedData) : null;

const useAuthStore = create((set) => ({
  user: parsedData?.user || null,
  wallet: parsedData?.wallet || null,

  setUser: ({ user, wallet }) => {
    const data = { user, wallet };
    localStorage.setItem("auth", JSON.stringify(data));
    set(data);
  },

  logout: () => {
    localStorage.removeItem("auth");
    set({ user: null, wallet: null });
  },
}));

export default useAuthStore;
