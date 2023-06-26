'use client';

import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/pages/api/web3.config';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import axios from 'axios';

export default function Normal() {
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  // const [metadataList, setMetadataList] = useState([]);

  // useEffect(() => {
  //   fetchAllNFTs();
  // }, []);

  // const fetchAllNFTs = async () => {
  //   try {
  //     const totalSupply = await contract.methods.totalSupply().call();
  //     const startFromIndex = BigInt(4); 
  //     const endAtIndex = BigInt(totalSupply) - BigInt(1); 
  //     const ids = [];
  //     for (let i = startFromIndex; i <= endAtIndex; i++) {
  //       const id = await contract.methods.tokenByIndex(i).call();
  //       ids.push(id);
  //     }
  //     const metadataList = await Promise.all(
  //       ids.map(async (id) => {
  //         const tokenURI = await contract.methods.tokenURI(id).call();
  //         const response = await axios.get(tokenURI);
  //         return response.data;
  //       })
  //     );
  //     setMetadataList(metadataList);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    // <div className='flex gap-5'>
    //   {metadataList.map((metadata, index) => (
    //     <div key={index} className='w-60 h-60 '>
    //       <img src={metadata.image} alt='NFT' className='w-60 h-52  '/>
    //     </div>
    //   ))}
    // </div>
    <div>1</div>
  );
}