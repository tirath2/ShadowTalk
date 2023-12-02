"useClient";
import React, { useState } from "react";

const ChatBox = ({ data }: any) => {
  const [messages, setMessages] = useState<any>([]);
  const [currentMessage, setCurrentMessage] = useState<any>("");

  const handleInputChange = (e: any) => {
    setCurrentMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (currentMessage.trim() !== "") {
      setMessages((prevMessages: any) => [currentMessage, ...prevMessages]);
      setCurrentMessage("");
    }
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-blue-400 p-4 text-black text-center overflow-y-auto">
        {messages.map((message: any, index: any) => (
          <div key={index} className="mb-2">
            {/* {message} */}
            {data}
          </div>
        ))}
      </div>
      <div className="bg-blue-400 p-4 text-black text-center">
        <input
          type="text"
          className="w-full px-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Type your message..."
          value={currentMessage}
          onChange={handleInputChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChatBox;
