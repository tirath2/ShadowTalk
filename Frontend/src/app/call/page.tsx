"use client";
import Ads from "@/components/Ads";
import ChatBox from "@/components/ChatBox";
import React, { useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";

const page = () => {
  const [signalData, setSignalData] = useState<string>();
  const pear: any = useRef(null);

  const handlePear = () => {
    const peer: any = new SimplePeer({ initiator: true });
    peer.on("connect", () => {
      console.log("Connected to peer!");
    });
    // peer.signal(data)
  };

  const createPear = () => {
    pear.current = new SimplePeer({ initiator: true });
    pearListners();
    console.log("createPear");
  };
  const pearListners = () => {
    pear?.current?.on("signal", (data: any) => {
      setSignalData(JSON.stringify(data));
      console.log(data, "data=>");
    });
    console.log("pearListners");
  };

  useEffect(() => {
    createPear();
    console.log("useEffect call");
  }, []);

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
          <ChatBox data={signalData} />
        </div>
      </div>
    </div>
  );
};

export default page;
