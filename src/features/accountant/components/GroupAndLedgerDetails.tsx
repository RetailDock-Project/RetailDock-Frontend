import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getGroupAndLedgersReport } from "../../../services/api/AccountsApi/accountsApi";
import { DateRangePicker } from "../../../components/ui/reusable/DateRangePicker";
import Loader from "../../../components/ui/reusable/Loader";

const GroupAndLedgerDetails: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();

  const [dateRange, setDateRange] = useState<{
    fromDate: Date | null;
    toDate: Date | null;
  }>({
    fromDate: null,
    toDate: null,
  });

  const fromDate = dateRange.fromDate?.toISOString() || "";
  const toDate = dateRange.toDate?.toISOString() || "";

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["ledger-report", groupId, fromDate, toDate],
    queryFn: () => getGroupAndLedgersReport(groupId!, fromDate, toDate),
    enabled: !!groupId,
  });



  const groupSummaries = data?.groupSummaries || [];
  const directLedgerSummaries = data?.directLedgerSummaries || [];

  if (!groupId) {
    return <div className="p-6 text-red-500">Group ID is missing from the URL.</div>;
  }





   const handleRowClick = (groupId: any) => {
    if (groupId) {
      navigate(`/home/accountant/financial-statement/groupAndLedgerDetails/${groupId}`); // Your route with ID
   refetch();
    }
  };


  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-semibold mb-2 md:mb-0">Group & Ledger Details</h2>
        <DateRangePicker
          onChange={(range) =>
            setDateRange({
              fromDate: range.startDate,
              toDate: range.endDate,
            })
          }
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loader />
        </div>
      ) : isError ? (
        <div className="text-red-500 text-center">Failed to fetch data.</div>
      ) : (
        <>
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Group Summaries</h3>
            {groupSummaries.length > 0 ? (
              <table className="w-full border text-sm text-center">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Group Name</th>
                    <th className="p-2 border">Nature</th>
                    <th className="p-2 border">Opening (Cr/Dr)</th>
                    <th className="p-2 border">Period Dr</th>
                    <th className="p-2 border">Period Cr</th>
                    <th className="p-2 border">Closing (Cr/Dr)</th>
                  </tr>
                </thead>
                <tbody>
                  {groupSummaries.map((group: any) => (
                    <tr
                      key={group.groupId}
                      onClick={() => handleRowClick(group.groupId)}
                      className="hover:bg-gray-100 cursor-pointer transition"
                    >
                      <td className="p-2 border">{group.groupName}</td>
                      <td className="p-2 border">{group.nature}</td>
                      <td className="p-2 border">
                        {group.openingBalance} ({group.openingType})
                      </td>
                      <td className="p-2 border">{group.periodDr}</td>
                      <td className="p-2 border">{group.periodCr}</td>
                      <td className="p-2 border">
                        {group.closingBalance} ({group.closingType})
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-sm text-gray-500">No group summaries found.</p>
            )}
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">Direct Ledger Summaries</h3>
            {directLedgerSummaries.length > 0 ? (
              <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Ledger Name</th>
                    <th className="p-2 border">Opening (Cr/Dr)</th>
                    <th className="p-2 border">Period Dr</th>
                    <th className="p-2 border">Period Cr</th>
                    <th className="p-2 border">Closing (Cr/Dr)</th>
                  </tr>
                </thead>
                <tbody>
                  {directLedgerSummaries.map((ledger: any) => (
                    <tr key={ledger.ledgerId} className="hover:bg-gray-50 text-center">
                      <td className="p-2 border">{ledger.ledgerName}</td>
                      <td className="p-2 border">
                        {ledger.openingBalance} ({ledger.openingType})
                      </td>
                      <td className="p-2 border">{ledger.periodDr}</td>
                      <td className="p-2 border">{ledger.periodCr}</td>
                      <td className="p-2 border">
                        {ledger.closingBalance} ({ledger.closingType})
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-sm text-gray-500">No direct ledger summaries found.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default GroupAndLedgerDetails;
