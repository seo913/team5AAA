"use client";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../layout";
import NftCard from "@/components/NftCard";
import { contract } from "@/pages/api/web3.config";
import Carousel from "@christian-martins/react-grid-carousel";

export default function Normal() {
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
    <>
      <div className="mx-20">
        <div className="font-Jalnan text-3xl pt-5 pb-2 text-white flex justify-center">
          Mypage
        </div>
        <Carousel cols={3} rows={2} gap={30}>
          {tokenIds?.reverse().map((v, i) => {
            return (
              <Carousel.Item key={i}>
                  <NftCard  tokenId={v}/>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </>
  );
}
