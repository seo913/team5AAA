'use client';
import { useParams, useRouter } from 'next/navigation';
import Web3 from 'web3';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { contract } from '@/pages/api/web3.config';

export default function Detail() {
  const router = useRouter();

  // console.log(contract);
  const { id } = useParams();
  const [nft, setNft] = useState();
  const metadata = id;
  const [formattedTime, setFormattedTime] = useState(''); //타임스탬프
  const [isOwner, setIsOwner] = useState(false); // 소유자 여부 상태

  const getNft = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const address = accounts[0];
      // console.log(address);

      const tokenid = await contract.methods.tokenURI(metadata).call();
      // console.log(tokenid);

      const response = await axios.get(tokenid);
      console.log(response.data);
      setNft({
        name: response.data.name,
        description: response.data.description[0].content,
        image: response.data.image,
        time: response.data.description[0].time,
        account: response.data.account,
        type: response.data.type,
      });

      // 로그인한 주소와 NFT 소유자 주소를 비교하여 소유자 여부를 설정
      setIsOwner(response.data.account.toLowerCase() === address.toLowerCase());
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNft = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const account = accounts[0]; // account 변수로 변경
      console.log(account);

      const nftX = await contract.methods
        .burnNFT(metadata)
        .send({ from: account });
      alert('삭제가 완료 되었습니다!');
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNft();
  }, []);

  useEffect(() => {
    if (nft && nft.time) {
      const timestamp = nft.time;
      const date = new Date(timestamp);
      const year = date.getFullYear(); // 연도
      const month = date.getMonth() + 1; // 월 (0부터 시작하므로 +1 필요)
      const day = date.getDate(); // 일

      const formattedDate = `${year}.0${month}.0${day}`;
      setFormattedTime(formattedDate);
    }
  }, [nft]);

  return (
    <div className=' min-h-screen wrap '>
      {/* <div className='shape'></div>
        <div className='shape'> </div>
        <div className='shape'></div> */}
      <div className='flex justify-center font-Jalnan text-2xl '>
        <p
          className='mt-10'
          style={{
            background: 'linear-gradient(to right, pink, white)',
            borderImage: 'linear-gradient(to right, pink, white) 1',
            WebkitTextFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
          }}
        >
          DETAIL PAGE
        </p>
      </div>
      <div className='flex justify-center items-center mt-40'>
        {nft && (
          <div>
            <div className='flex rounded-lg  backdrop-blur-sm bg-gradient-to-r from-purple-500 to-transparent gap-5 shadow-xl shadow-purple-900 w-[900px] h-[500px]'>
              <div className='flex flex-col justify-center items-center  mb-4'>
                <p
                  className='mb-3 font-semibold text-2xl'
                  style={{
                    background: 'linear-gradient(to right, pink, white)',
                    borderImage: 'linear-gradient(to right, pink, white) 1',
                    WebkitTextFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                  }}
                >
                  TITLE: {nft.name}
                </p>
                <img
                  src={nft.image}
                  alt='NFT Image'
                  className='ml-5 w-[300px] h-[300px] rounded-lg shadow-xl shadow-black'
                />
                <div className='flex justify-center items-center mt-2 text-xl font-semibold '>
                  <button
                    className='mr-2 mt-10 rounded-md border-0'
                    style={{
                      background: 'linear-gradient(to right, pink, white)',
                      borderImage: 'linear-gradient(to right, pink, white) 1',
                      WebkitTextFillColor: 'transparent',
                      WebkitBackgroundClip: 'text',
                    }}
                    onClick={() => {
                      router.back();
                    }}
                  >
                    BACK
                  </button>
                  {isOwner && (
                    <button
                      onClick={deleteNft}
                      className='mt-10 rounded-md border-0'
                      style={{
                        background: 'linear-gradient(to right, pink, white)',
                        borderImage: 'linear-gradient(to right, pink, white) 1',
                        WebkitTextFillColor: 'transparent',
                        WebkitBackgroundClip: 'text',
                      }}
                    >
                      DELETE
                    </button>
                  )}
                </div>
              </div>

              <div>
                <div
                  className='mr-1 mt-[68px] rounded-md border-0 text-lg font-semibold '
                  style={{
                    background: 'linear-gradient(to right, pink, white)',
                    borderImage: 'linear-gradient(to right, pink, white) 1',
                    WebkitTextFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                  }}
                >
                  <p className='mb-3'>TYPE: {nft.type}</p>
                  <p className='mb-3'>CREATED TIMESNAP: {formattedTime}</p>
                  <p className='mb-8'>
                    OWNER: <span> {nft.account}</span>
                  </p>
                  <p className='ml-[2px]'>DESCRIPTION</p>
                  <div className='w-[540px] h-[165px] bg-gray-300 bg-opacity-10 rounded-lg shadow-inner shadow-purple-900'>
                    <p
                      className='mb-3 pt-2 pl-2'
                      style={{
                        background: 'linear-gradient(to right, pink, white)',
                        borderImage: 'linear-gradient(to right, pink, white) 1',
                        WebkitTextFillColor: 'transparent',
                        WebkitBackgroundClip: 'text',
                      }}
                    >
                      {nft.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
