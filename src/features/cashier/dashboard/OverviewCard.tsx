import React from "react";

type Props = {
  title: string;
  value: string;
  subtitle: string;
  change: string;
  changeColor: string;
};

const OverviewCard: React.FC<Props> = ({
  title,
  value,
  subtitle,
  change,
  changeColor,
}) => (
  <div className="bg-white p-4 rounded-xl border shadow-sm">
    <h2 className="text-gray-500 text-sm">{title}</h2>
    <p className="text-xl font-semibold">{value}</p>
    <p className="text-sm text-gray-500">{subtitle}</p>
    <p className={`text-xs mt-1 ${changeColor}`}>{change}</p>
  </div>
);

export default OverviewCard;
