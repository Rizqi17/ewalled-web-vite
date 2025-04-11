import Nav from "../components/Nav";
import Greeting from "../components/Greeting";
import AccountInfoCard from "../components/AccountInfoCard";
import avatar from "../assets/chelsea (1).png";
import TransactionTable from "../components/TransactionTable";
import "../styles/HomePage.css";

function FinancialPage() {
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
  
  export default FinancialPage;