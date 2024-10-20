import React, { useEffect, useState } from "react";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };
    contract && memosMessage();
    // console.log(contract);
  }, [contract]);
  return (
    <>
      <p className="text-center mt-5">Messages</p>
      {console.log(memos)}

      {memos.map((memo) => {
        return (
          <div className="container-fluid w-full" key={Math.random()}>
            <table className="mb-2 w-full">
              <tbody>
                <tr>
                  <td className="bg-teal-300 border border-white p-2 w-24">
                    {memo.name}
                  </td>
                  <td className="bg-teal-300 border border-white p-2 w-96">
                    {new Date(memo.timestamp * 1000).toLocaleString()}
                  </td>
                  <td className="bg-teal-300 border border-white p-2 w-72">
                    {memo.message}
                  </td>
                  <td className="bg-teal-300 border border-white p-2 w-96">
                    {memo.from}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
};

export default Memos;
