"use client";
import React, { useState } from "react";

const Ads = () => {
  const [currentMessage, setCurrentMessage] = useState<any>("");

  const handleInputChange = (e: any) => {
    setCurrentMessage(e.target.value);
  };
  const btnClickHandler = (e: any) => {
    console.log(currentMessage, "currentMessage");
  };
  return (
    <div>
      <div className="bg-yellow-200 p-4 text-black text-center">
        <h2 className="text-lg font-bold mb-2">Advertisement</h2>
        <p className="text-sm">Check out our amazing deals!</p>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Type your message..."
          value={currentMessage}
          onChange={handleInputChange}
        />
        <button
          onClick={btnClickHandler}
          className={
            "bg-blue-500 hover:bg-blue-700 rounded-lg mt-2 p-1 text-white"
          }
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default Ads;
