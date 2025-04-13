import React from "react";
import Nav from "../components/Nav";
import Greeting from "../components/Greeting";
import InOutCard from "../components/InOutCard";
import BalanceCard from "../components/BalanceCard";
import FinancialChart from "../components/FinancialChart";
import "../styles/components/FinancialOverviewPage.css";
import useAuthStore from "../store/authStore";

const FinancialOverviewPage = () => {
  const user = useAuthStore((state) => state.user);
  const wallet = useAuthStore((state) => state.wallet);
  return (
    <div className="financial-overview-container">
      <Nav />

      <div className="financial-overview-content">
        <Greeting user={user} />

        <div className="inout-section">
          <InOutCard />
        </div>

        <div className="chart-balance-section">
          <BalanceCard />
          <FinancialChart />
        </div>
      </div>
    </div>
  );
};

export default FinancialOverviewPage;
