import React, { useState } from "react";
import { sendMessage, getMessagesWithUser } from "./contract";

function App() {
  const [receiver, setReceiver] = useState("");
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);

  // Load messages with the receiver
  const loadMessages = async () => {
    if (receiver) {
      const userMessages = await getMessagesWithUser(receiver);
      setMessages(userMessages);
    }
  };

  const handleSendMessage = async () => {
    if (receiver && content) {
      await sendMessage(receiver, content);
      setContent(""); // Clear message input after sending
      loadMessages(); // Reload messages after sending
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-xl font-bold mb-4 text-center">
          Decentralized Chat
        </h1>

        {/* Input for Receiver */}
        <input
          type="text"
          placeholder="Receiver Address"
          className="border border-gray-300 w-full p-2 rounded mb-3"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />

        {/* Textarea for Message */}
        <textarea
          placeholder="Message"
          className="border border-gray-300 w-full p-2 rounded mb-3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Send Button */}
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
        >
          Send Message
        </button>

        {/* Load Messages Button */}
        <button
          onClick={loadMessages}
          className="bg-gray-500 text-white py-2 px-4 rounded w-full mt-4 hover:bg-gray-600"
        >
          Load Messages
        </button>

        {/* Messages Display */}
        <div className="mt-6 max-h-64 overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg mb-2 ${
                  msg.sender.toLowerCase() === receiver.toLowerCase()
                    ? "bg-green-100"
                    : "bg-gray-100"
                }`}
              >
                <p className="font-semibold">
                  From: {msg.sender.slice(0, 6)}...{msg.sender.slice(-4)}
                </p>
                <p className="text-gray-700">{msg.content}</p>
                <p className="text-xs text-gray-500">
                  {new Date(Number(msg.timestamp) * 1000).toLocaleString()}
                </p>
                <div>{console.log(msg)}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No messages yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
