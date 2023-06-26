'use client';
import { useState } from 'react';
import FileUpload from './mint/mintform';

export default function LoginForm() {
  const [account, setAccount] = useState();

  async function connect() {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(res[0]);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Install metamask');
      // alert('Install metamas');
    }
  }
  
  window.addEventListener('load', () => {
    connect();
  });

  return (
    <div>
      <button
        className='App'
        onClick={() => {
          connect();
        }}
      >
        CONNECT WALLET
      </button>
      <p> 지갑주소 : {account}</p>
      {/* <div className={`hidden ${!account ? 'block' : ''}`}> */}
      <div className=''>
      {/* <FileUpload account={account} /> */}
      </div>
      {/* </div> */}
    </div>
  );
}
