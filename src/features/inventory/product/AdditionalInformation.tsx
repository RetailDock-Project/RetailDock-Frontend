import React from "react";

const AdditionalInformation: React.FC = () => {
  return (
    <div className="bg-white border shadow rounded-xl p-6 space-y-4 mt-6">
      <h2 className="text-lg font-semibold text-gray-800">
        Additional Information
      </h2>
      <div className="grid grid-cols-1  text-sm">
        <div className=" rounded-lg p-1 shadow-sm">
          <p className="text-gray-500">Created On:</p>
          <p className="font-medium text-gray-800">1/5/2023</p>
        </div>
        <div className=" rounded-lg p-1 shadow-sm">
          <p className="text-gray-500">Last Updated:</p>
          <p className="font-medium text-gray-800">5/10/2023</p>
        </div>
        <div className=" rounded-lg p-1 shadow-sm">
          <p className="text-gray-500">Last Purchase:</p>
          <p className="font-medium text-gray-800">5/20/2023</p>
        </div>
        <div className=" rounded-lg p-1 shadow-sm">
          <p className="text-gray-500">Last Sale:</p>
          <p className="font-medium text-gray-800">5/18/2023</p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformation;
