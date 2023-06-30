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
      const getTokenURI = await contract.methods.tokenURI(`${tokenId}`).call();
      const response = await axios.get(getTokenURI);

      console.log(response.data);
      setNft(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNftMetadata();
  }, []);

  return <div>working?</div>;
};

export default NftCard;
