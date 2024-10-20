import React, { useState } from "react";
import Memos from "./components/Memos";
import useWalletConnection from "./hooks/useWalletConnection";
import SendMessage from "./components/SendMessage";

const App = () => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("");
  useWalletConnection(setState, setAccount);

  console.log(state);

  return (
    <div>
      <div className="font-bold">
        Account Id: {account ? account : "No account connected"}
      </div>

      <SendMessage state={state} />
      <Memos state={state} />
    </div>
  );
};

export default App;
