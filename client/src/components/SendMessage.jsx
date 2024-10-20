import { ethers } from "ethers";
import React, { useState } from "react";

const SendMessage = ({ state }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const buyChai = async (event) => {
    event.preventDefault();

    const { contract } = state;
    console.log(name, message, contract);
    const amount = { value: ethers.utils.parseEther("0.000000001") };

    try {
      const transaction = await contract.buyChai(name, message, amount);
      await transaction.wait();
      console.log("Transaction is done");
    } catch (error) {
      console.error("Transaction failed", error);
    }
  };
  return (
    <div className="container mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white max-w-md">
      <h2 className="text-xl font-bold mb-4">Buy Chai</h2>
      <form onSubmit={buyChai}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <input
            type="text"
            id="message"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={message || ""}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter Your Message"
            required
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            !state.contract ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!state.contract}
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
