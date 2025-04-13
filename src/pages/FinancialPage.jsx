import Nav from "../components/Nav";
import Greeting from "../components/Greeting";
import AccountInfoCard from "../components/AccountInfoCard";
import avatar from "../assets/chelsea (1).png";
import TransactionTable from "../components/TransactionTable";
import "../styles/HomePage.css";
import useAuthStore from "../store/authStore";

function FinancialPage() {
  const user = useAuthStore((state) => state.user);
  const wallet = useAuthStore((state) => state.wallet);
  return (
    <>
      <Nav />
      <div className="container">
        <Greeting user={user} />
        <AccountInfoCard />
        <TransactionTable />
      </div>
    </>
  );
}

export default FinancialPage;
