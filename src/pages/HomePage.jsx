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

  useEffect(() => {
    console.log("Logged in user:", user.username);
    console.log("wallet:", wallet.balance);
  }, [user]);
  return (
    <>
      <Nav />
      <div className="container">
        <Greeting avatar={avatar} />
        <AccountInfoCard />
        <TransactionTable />
      </div>
    </>
  );
}

export default HomePage;
