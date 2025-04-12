import React, { useState } from "react";
import "../styles/components/FinancialChart.css";

const chartData = {
  weekly: [
    { week: "Week 1", income: 5000000, outcome: 7000000 },
    { week: "Week 2", income: 7000000, outcome: 6000000 },
    { week: "Week 3", income: 4000000, outcome: 7000000 },
    { week: "Week 4", income: 4000000, outcome: 5000000 },
  ],
  monthly: [],
  quarterly: [],
};

const FinancialChart = () => {
  const [selected, setSelected] = useState("weekly");

  const renderBars = () =>
    chartData[selected].map((item, index) => (
      <div key={index} className="chart-bar">
        <div className="bar-group">
          <div className="bar income" style={{ height: `${item.income / 100000}px` }}></div>
          <div className="bar outcome" style={{ height: `${item.outcome / 100000}px` }}></div>
        </div>
        <p>{item.week}</p>
      </div>
    ));

  return (
    <div className="chart-wrapper">
      <div className="legend">
        <span className="legend-dot income-dot"></span> Income
        <span className="legend-dot outcome-dot"></span> Outcome
      </div>
      <div className="chart-container">{renderBars()}</div>
      <div className="chart-toggle">
        <button onClick={() => setSelected("weekly")} className={selected === "weekly" ? "active" : ""}>Weekly</button>
        <button onClick={() => setSelected("monthly")} className={selected === "monthly" ? "active" : ""}>Monthly</button>
        <button onClick={() => setSelected("quarterly")} className={selected === "quarterly" ? "active" : ""}>Quarterly</button>
      </div>
    </div>
  );
};

export default FinancialChart;
