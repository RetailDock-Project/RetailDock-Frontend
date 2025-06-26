import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[95%] w-sm-[50%]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow border sm:max-w-md xl:p-0">
            {/* Brand Title and Description */}
            <div className="text-center mt-6 mb-3">
              <h1 className="text-3xl font-bold text-blue-900">RetailDock</h1>
              <p className="text-sm text-gray-600">
                Complete Retail Business Management Solution
              </p>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
