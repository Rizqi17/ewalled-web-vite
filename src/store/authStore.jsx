import { create } from "zustand";
import axios from "axios";

const storedData = localStorage.getItem("auth");
const parsedData = storedData ? JSON.parse(storedData) : null;

const useAuthStore = create((set) => ({
  user: parsedData?.user || null,
  wallet: parsedData?.wallet || null,
  transactions: [],

  setData: ({ user, wallet }) => {
    const data = { user, wallet };
    localStorage.setItem("auth", JSON.stringify(data));
    set(data);
  },

  updateWalletBalance: (newBalance) =>
    set((state) => {
      const updatedWallet = { ...state.wallet, balance: newBalance };
      const updatedData = { user: state.user, wallet: updatedWallet };
      localStorage.setItem("auth", JSON.stringify(updatedData));
      return { wallet: updatedWallet };
    }),

  fetchWalletByUserId: async (userId) => {
    try {
      const { data } = await axios.get(
        `https://ewalled-api-production.up.railway.app/api/wallets/${userId}`
      );

      set((state) => {
        const updatedWallet = { ...state.wallet, ...data };
        const updatedData = { user: state.user, wallet: updatedWallet };
        localStorage.setItem("auth", JSON.stringify(updatedData));
        return { wallet: updatedWallet };
      });
    } catch (err) {
      console.error("Failed to fetch wallet:", err);
    }
  },
  setTransactions: (transactions) => set({ transactions }),
  fetchTransactionsByWalletId: async (walletId) => {
    try {
      const { data } = await axios.get(
        `https://ewalled-api-production.up.railway.app/api/transactions?walletId=${walletId}`
      );
      set({ transactions: data });
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  },
  logout: () => {
    localStorage.removeItem("auth");
    set({ user: null, wallet: null, transactions: [] });
  },
}));

export default useAuthStore;
