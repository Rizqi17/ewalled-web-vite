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
  if (!user.avatarUrl) {
    user.avatarUrl = `https://avatar.iran.liara.run/username?username=${user?.fullname}`;
  }

  useEffect(() => {
    if (user && wallet) {
      console.log("Logged in user:", user);
      console.log("Wallet balance:", wallet);
      console.log(user.avatarUrl);
    }
  }, [user, wallet]);
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
