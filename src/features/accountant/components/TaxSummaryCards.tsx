import React from "react";

interface TaxSummaryCardsProps {
  inputTax: number;
  outputTax: number;
}

const TaxSummaryCards: React.FC<TaxSummaryCardsProps> = ({ inputTax, outputTax }) => {
  const netTaxLiability = outputTax - inputTax;

  const cardStyle =
    "flex-1 bg-white rounded shadow px-4 py-3 text-center border";

  return (
    <div className="px-4">
  <div className="flex flex-wrap justify-between gap-4 my-4">
    <div className="flex-1 min-w-[220px] bg-white rounded shadow px-4 py-3 text-center border">
      <div className="text-sm text-gray-500">Input Tax</div>
      <div className="text-xl font-semibold text-green-600">
        ${inputTax.toFixed(2)}
      </div>
    </div>

    <div className="flex-1 min-w-[220px] bg-white rounded shadow px-4 py-3 text-center border">
      <div className="text-sm text-gray-500">Output Tax</div>
      <div className="text-xl font-semibold text-blue-600">
        ${outputTax.toFixed(2)}
      </div>
    </div>

    <div className="flex-1 min-w-[220px] bg-white rounded shadow px-4 py-3 text-center border">
      <div className="text-sm text-gray-500">Net Tax Liability</div>
      <div
        className={`text-xl font-semibold ${
          netTaxLiability >= 0 ? "text-red-600" : "text-green-600"
        }`}
      >
        ${netTaxLiability.toFixed(2)}
      </div>
    </div>
  </div>
</div>
  )
}


export default TaxSummaryCards
