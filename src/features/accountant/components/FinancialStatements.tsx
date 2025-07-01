import React, { useState } from "react";
import StatementCard from "./StatementCard";
import ProfitLoss from "./ProfitLoss";
import BalanceSheet from "./BalanceSheet ";
import TrialBalance from "./TrialBalance ";


const FinancialStatements: React.FC = () => {
  const [active, setActive] = useState("profit");

  const cards = [
    { key: "profit", title: "Profit & Loss", desc: "Revenue, expenses, and profit summary" },
    { key: "balance", title: "Balance Sheet", desc: "Assets, liabilities, and equity overview" },
    { key: "trial", title: "Trial Balance", desc: "Debit and credit balances for all accounts" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Financial Statements</h2>

      {/* Card Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => (
          <StatementCard
            key={card.key}
            title={card.title}
            description={card.desc}
            isActive={active === card.key}
            onClick={() => setActive(card.key)}
          />
        ))}
      </div>

      {/* Render Corresponding Component */}
      <div className="mt-6">
        {active === "profit" && <ProfitLoss />}
        {active === "balance" && <BalanceSheet />}
        {active === "trial" && <TrialBalance />}
      </div>
    </div>
  );
};

export default FinancialStatements;
