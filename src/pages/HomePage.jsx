import Nav from "../components/Nav";
import Greeting from "../components/Greeting";
import "../styles/HomePage.css";
import avatar from "../assets/chelsea (1).png";
import AccountInfoCard from "../components/AccountInfoCard";
import TransactionTable from "../components/TransactionTable";
import downloadIcon from "../assets/symbols_download.png"; // Gambar FAB
import { useEffect } from "react";
import useAuthStore from "../store/authStore";

function HomePage() {
  const user = useAuthStore((state) => state.user);
  const wallet = useAuthStore((state) => state.wallet);
  const fetchWalletByUserId = useAuthStore((state) => state.fetchWalletByUserId);
  const fetchTransactionsByWalletId = useAuthStore((state) => state.fetchTransactionsByWalletId);

  if (!user.avatarUrl) {
    user.avatarUrl = `https://avatar.iran.liara.run/username?username=${user?.fullname}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        await fetchWalletByUserId(user.id);
        const updatedWallet = useAuthStore.getState().wallet;
        if (updatedWallet?.id) {
          await fetchTransactionsByWalletId(updatedWallet.id);
        }
      }
    };
    fetchData();
  }, [user?.id]);

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `https://ewalled-api-production.up.railway.app/api/transactions/export/pdf?walletId=${wallet.id}`
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "riwayat-transaksi.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Gagal mengunduh PDF:", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="container">
        <Greeting user={user} />
        <AccountInfoCard wallet={wallet} />
        <TransactionTable />
      </div>

      {/* Floating Button */}
      <button className="fab-download" onClick={handleDownload}>
        <img src={downloadIcon} alt="Download" />
      </button>
    </>
  );
}

export default HomePage;
