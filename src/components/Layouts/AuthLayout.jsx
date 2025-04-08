import React from "react";

import CARD_2 from "../../assets/images/card2.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[40vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-white">PROMOVIO</h2>
        {children}
      </div>

      <div className="hidden md:block w-[60vw] h-screen bg-zinc-900 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5" />

        <div className="grid grid-cols-1 z-20 ">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label={<span className="text-white">Track Your Income & Expenses</span>}
            value={<span className="text-white">430,000</span>}
            color="bg-primary"
          />
        </div>

        <img
          src={CARD_2}
          className="w-64 lg:w-[70%] absolute bottom-10 shadow-lg shadow-blue-400/15"
        />
      </div>
    </div>
  );
};

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-zinc-800 p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-white-500 mb-1">{label}</h6>
        <span className="text-[20px] text-white">${value}</span>
      </div>
    </div>
  );
};

export default AuthLayout;
