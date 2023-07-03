import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/pages/api/web3.config";
import Web3 from "web3";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const NftCard = ({ tokenId }) => {
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  const [nft, setNft] = useState();

  const getNftMetadata = async () => {
    try {
      // const getTokenURI = await contract.methods.tokenURI(`${tokenId}`).call();
      const getTokenURI = await contract.methods
        .metadataUri(`${tokenId}`)
        .call();

      const response = await axios.get(getTokenURI);

      let nftArray = [];

      // setNft();
      console.log(response.data);

      // 데이터 어레이 더 만들기 7/1
      nftArray.push({
        tokenId,
        name: response.data.name,
        content: response.data.description[0].content,
        type: response.data.type,
        accountAddress: response.data.account,
        time: response.data.description[0].time,
        image: response.data.image,
      });

      // console.log(response);
      setNft(nftArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNftMetadata();
  }, []);

  // tokenId와 metadata가 담긴 nftArray 확인
  useEffect(() => {
    // console.log(nft);
  }, [nft]);

  return (
    <div className="m-3">
      {nft && nft[0] && (
        <div>
          <div>이름: {nft[0].name} </div>
          <div>콘텐츠: {nft[0].content} </div>
          <div>타입: {nft[0].type} </div>
          <div>시간: {nft[0].time} </div>
          <div>어카운트: {nft[0].accountAddress} </div>
          <div>
            이미지:
            <Image
              src={nft[0].image}
              alt="NFT Image"
              width={200}
              height={200}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NftCard;
