import React from "react";
import Nav from "../components/Nav";
import Greeting from "../components/Greeting";
import InOutCard from "../components/InOutCard";
import BalanceCard from "../components/BalanceCard";
import FinancialChart from "../components/FinancialChart";
// import "../styles/components/FinancialOverviewPage.css";
// import useAuthStore from "../store/authStore";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";


import { useEffect, useState } from "react";
import { VictoryChart, VictoryGroup, VictoryBar, VictoryAxis, VictoryLegend } from "victory";
import "../styles/components/FinancialOverviewPage.css";
import useAuthStore from "../store/authStore";

function FinancialOverviewPage() {
  const [period, setPeriod] = useState("weekly");
  const [summaryData, setSummaryData] = useState(null);
  const { user, wallet } = useAuthStore();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(
          `https://ewalled-api-production.up.railway.app/api/summary/${wallet.id}`
        );
        const data = await response.json();
        setSummaryData(data);
      } catch (error) {
        console.error("Failed to fetch summary data:", error);
      }
    };

    if (wallet?.id) {
      fetchSummary();
    }
  }, [wallet?.id]);

  if (!wallet?.id || !summaryData) {
    return <p style={{ padding: 20 }}>Loading summary...</p>;
  }

  const selectedData = summaryData[period];
  const chartFormatted = [...selectedData.data].reverse().map((item) => ({
    x: item.period,
    income: item.income,
    outcome: item.outcome,
  }));

  return (
    <>
    <Nav />
    <div className="financial-container">
    
      <Greeting user={user} />

      <div className="summary-row">
        <div className="summary-card income-card">
          <p className="label">Total Income</p>
          <p className="value">Rp {selectedData.totalIncome.toLocaleString("id-ID")}</p>
        </div>
        <div className="summary-card outcome-card">
          <p className="label">Total Outcome</p>
          <p className="value">Rp {selectedData.totalOutcome.toLocaleString("id-ID")}</p>
        </div>
      </div>

      <div className="balance-chart-wraper"  >
      <div className="balance-card-financial">
        <p className="label">Net Balance</p>

        {selectedData.netBalance < 0 ? (
          <div style={{ display: "flex", alignItems:"center",flexDirection: "row", gap: 10 }}>
            <FiTrendingDown className="trend-icon" size={24} style={{ color: "#f47c2c" }} />
            <p className="value-negative"> Rp {selectedData.netBalance.toLocaleString("id-ID")}</p>
            </div>
        ) : (
          <div style={{ display: "flex", alignItems:"center",flexDirection: "row", gap: 10 }}>
           <FiTrendingUp className="trend-icon" size={24} style={{ color: "green" }} />
            <p className="value-positive">
          Rp {selectedData.netBalance.toLocaleString("id-ID")}
        </p>
            </div>
        )}
      </div>

      <div className="chart-container">
        <VictoryChart domainPadding={{ x: 30 }} padding={{ top: 60, bottom: 50, left: 60, right: 20 }}>
          <VictoryGroup offset={23} colorScale={["#0061FF", "#f47c2c"]}>
            <VictoryBar data={chartFormatted} x="x" y="income" />
            <VictoryBar data={chartFormatted} x="x" y="outcome" />
          </VictoryGroup>
          <VictoryAxis
            style={{ tickLabels: { angle: -15, fontSize: 8, padding: 10 } }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => `Rp ${x / 1_000_000} jt`}
            style={{ tickLabels: { fontSize: 8, padding: 5 } }}
          />
          <VictoryLegend
            x={120}
            y={10}
            orientation="horizontal"
            gutter={20}
            standalone={false}
            data={[
              { name: "Income", symbol: { fill: "#0061FF" } },
              { name: "Outcome", symbol: { fill: "#f47c2c" } },
            ]}
          />
        </VictoryChart>
        <div className="toggle-row">
        {["Weekly", "Monthly", "Quarterly"].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p.toLowerCase())}
            className={`toggle-btn ${period === p.toLowerCase() ? "active" : ""}`}
          >
            {p}
          </button>
        ))}
        </div>
      </div>
      
      </div>

      

      
    </div>
    </>
  );
}

export default FinancialOverviewPage;
