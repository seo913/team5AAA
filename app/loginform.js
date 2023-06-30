"use client";

import { AppContext } from "./layout";
import { useContext } from "react";
import FileUpload from "./mint/mintform";

export default function LoginForm() {
  const { account, setAccount } = useContext(AppContext);

  async function connect() {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(res[0]);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Install metamask");
      // alert('Install metamas');
    }
  }

  // window.addEventListener('load', () => {
  //   connect();
  // });

  return (
    <div>
      <button
        className="App text-white"
        onClick={() => {
          connect();
        }}
      >
        CONNECT WALLET
      </button>
      <p className="text-white">
        지갑주소 : {account.substring(0, 4)}...
        {account.substring(account.length - 4)}
      </p>
    </div>
  );
}
