'use client';
import { useParams, useRouter } from 'next/navigation';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/pages/api/web3.config';
import Web3 from 'web3';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Detail() {
  const router = useRouter();
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  console.log(contract);
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
  }, [id]);

  // console.log(metadata);

  const getNft = async () => {
    try {

      // const metadata = 12;
      // console.log(metadata);
      // const tokenid = await contract.methods.tokenURI(metadata).call();
      // console.log(tokenid);
      // const response = await axios.get(id);
      // console.log(response);
      // const to = await contract.methods.metadataUri(id).call();
      // console.log(to);
    } catch (error) {
      console.log(error);
    }
  };
  getNft();

  return (
    <div>
      <div className='min-h-screen flex justify-center items-center gap-10'>
        <div className='border border-black w-[400px] h-[400px]'>
          <p>이미지</p>
        </div>

        <div className='border border-black w-[400px] h-[400px] font-semibold text-lg relative'>
          <div>
            <p>
              title : <span></span>
            </p>
          </div>
          <div>
            <p>
              content : <span></span>
            </p>
          </div>

          <div className='flex justify-center items-center absolute bottom-1 left-[33%]'>
            <div>
              <button
                className='border mr-1 '
                onClick={() => {
                  router.back();
                }}
              >
                뒤로가기
              </button>
            </div>

            <div>
              <button className='border'>삭제하기</button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
