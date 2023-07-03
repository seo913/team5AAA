"use client";

import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/pages/api/web3.config";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../layout";
import Web3 from "web3";
import axios from "axios";
import NftCard from "@/components/NftCard";

export default function Normal() {
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  //props account
  const { account } = useContext(AppContext);

  const [tokenIds, setTokenIds] = useState();

  // 내가 가진 nft tokenId 가져오기
  const getMyNft = async () => {
    try {
      // contract가 없거나 account가 없으면 해당 함수 빠져나감
      if (!contract || !account) return;

      //bigInt[]로 받아 옴
      const response = await contract.methods.getAllNft(account).call();

      //number[]로 변경
      const tempArray = response.map((v) => {
        return Number(v);
      });

      setTokenIds(tempArray);
    } catch (error) {
      console.error(error);
    }
  };

  // getMyNft는 account에 따라 달라지기 때문에 따로 만들고 의존성 배열 추가
  useEffect(() => {
    getMyNft();
  }, [account]);

  return (
    <div className="flex">
      {tokenIds?.reverse().map((v, i) => {
        return <NftCard key={i} tokenId={v} />;
      })}
    </div>
  );
}
