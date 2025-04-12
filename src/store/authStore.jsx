import { create } from "zustand";

const storedData = localStorage.getItem("auth");
const parsedData = storedData ? JSON.parse(storedData) : null;

const useAuthStore = create((set) => ({
  user: parsedData?.user || null,
  wallet: parsedData?.wallet || null,

  setData: ({ user, wallet }) => {
    const data = { user, wallet };
    localStorage.setItem("auth", JSON.stringify(data));
    set(data);
  },

  updateWalletBalance: (newBalance) =>
    set((state) => ({
      wallet: {
        ...state.wallet,
        balance: newBalance,
      },
    })),

  logout: () => {
    localStorage.removeItem("auth");
    set({ user: null, wallet: null });
  },
}));

export default useAuthStore;
