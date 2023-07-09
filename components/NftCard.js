
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { contract } from "@/pages/api/web3.config";

const NftCard = ({ tokenId }) => {
  
  const [nft, setNft] = useState();

  const getNftMetadata = async () => {
    try {
      const getTokenURI = await contract.methods
        .metadataUri(`${tokenId}`)
        .call();
      const response = await axios.get(getTokenURI);

      // 리빌 상태에 따른 이미지 가져오기
      const getTokenImg = await contract.methods
        .tokenURI(`${tokenId}`)
        .call();
      const response2 = await axios.get(getTokenImg);

      let nftArray = [];

      nftArray.push({
        tokenId,
        name: response.data.name,
        content: response.data.description[0].content,
        type: response.data.type,
        accountAddress: response.data.account,
        time: response.data.description[0].time,
        image: response2.data.image,
      });

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
    <div className="w-[350px]">
      {nft && nft[0] && (
        // 여기 안쪽에서 뭔가 사진이나 글씨쪽을 고정시키면 될거 같음
        <div> 
          <Carousel
            showArrows={true}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
          >
            <div>
              <Image
                src={nft[0].image}
                alt="NFT Image"
                width={350}
                height={350}
                className="rounded-xl"
              />
            </div>
            <div className="font-Jalnan pt-4 text-center w-[350px]">
              <div className="bg-zinc-800 text-slate-400 p-2 mt-2 rounded-3xl text-sm w-[350px]">
                <div className="pl-2 text-white">{nft[0].name}</div>
                <div>{nft[0].content}</div>
                <div>Reveal-Type: {nft[0].type} </div>
                <div>Time: {nft[0].time} </div>
                <div>
                  Account: {nft[0].accountAddress.substring(0, 4)}...
                  {nft[0].accountAddress.substring(
                    nft[0].accountAddress.length - 4
                  )}
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default NftCard;
