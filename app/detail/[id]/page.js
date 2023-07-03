'use client';
import { useParams, useRouter } from 'next/navigation';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/pages/api/web3.config';
import Web3 from 'web3';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Detail() {
  const router = useRouter();

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
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
      // console.log(response.data);
      setNft({
        name: response.data.name,
        description: response.data.description[0].content,
        image: response.data.image,
        time: response.data.description[0].time,
        account: response.data.account,
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

      const formattedDate = `${year}년 ${month}월 ${day}일`;
      setFormattedTime(formattedDate);
    }
  }, [nft]);

  return (
    <div className='bg-gradient-to-br  from-purple-700 via-indigo-700 to-pink-700 text-white'>
      <div className='min-h-screen flex justify-center items-center font-Jalnan '>
        {nft && (
          <div>
            <p>추억 생성한 날짜 : {formattedTime}</p>
            <div className='flex gap-10'>
              <div className='border border-white w-[400px] h-[450px] '>
                <img
                  src={nft.image}
                  alt='NFT Image'
                  className='w-[400px] h-[300px]'
                />
                <p>TimeSnap</p>
                <p>Title: {nft.name}</p>
                <p>content: {nft.description}</p>
                <p>주인: {nft.account}</p>
                <div className='flex'>
                  <button
                    className='border mr-1 '
                    onClick={() => {
                      router.back();
                    }}
                  >
                    뒤로가기
                  </button>
                  {isOwner && (
                    <button onClick={deleteNft} className='border'>
                      삭제하기
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
