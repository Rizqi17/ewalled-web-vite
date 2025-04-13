import Nav from "../components/Nav";
import Greeting from "../components/Greeting";
import "../styles/HomePage.css";
import avatar from "../assets/chelsea (1).png";
import AccountInfoCard from "../components/AccountInfoCard";
import TransactionTable from "../components/TransactionTable";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";

function HomePage() {
  const user = useAuthStore((state) => state.user);
  const wallet = useAuthStore((state) => state.wallet);
  const fetchWalletByUserId = useAuthStore(
    (state) => state.fetchWalletByUserId
  );
  const fetchTransactionsByWalletId = useAuthStore(
    (state) => state.fetchTransactionsByWalletId
  );
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
  return (
    <>
      <Nav />
      <div className="container">
        <Greeting user={user} />
        <AccountInfoCard wallet={wallet} />
        <TransactionTable />
      </div>
    </>
  );
}

export default HomePage;
