'use client';

import { AppContext } from './layout';
import { useContext } from 'react';

export default function LoginForm() {
  const { account, setAccount } = useContext(AppContext);

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

  return (
    <div className='flex justify-center items-center'>
    <button
      className='App text-white'
      onClick={() => {
        connect();
      }}
      style={{ display: account ? 'none' : 'block' }}
    >
      <div className='flex items-center justify-center'>
        <p className='text-base text-center'>CONNECT</p>
      </div>
    </button>
    {account && (
      <p className='text-white text-base text-right'>
        {account.substring(0, 4)}...
        {account.substring(account.length - 4)}
      </p>
    )}
  </div>
  );
}
