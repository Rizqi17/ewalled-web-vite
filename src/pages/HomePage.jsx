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

  useEffect(() => {
    console.log("Logged in user:", user);
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
