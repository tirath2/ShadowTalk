"use client";
import Ads from "@/components/Ads";
import ChatBox from "@/components/ChatBox";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex">
        <div className="flex-1 bg-pink-100 p-4 text-[black] text-center ">
          Video Box 1
        </div>
        <div className="flex-1 bg-blue-200 p-4 text-center ">
          <Ads />
        </div>
      </div>
      <div className="flex-1 flex">
        <div className="flex-1 bg-gray-300 p-4 text-[black] text-center ">
          Video Box 2
        </div>
        <div className="flex-1 bg-blue-400 p-4 text-[black] text-center ">
          Chat Box
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default page;
