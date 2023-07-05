"use client";

import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/pages/api/web3.config";
import { useEffect, useState } from "react";
import Web3 from "web3";
import axios from "axios";
import Link from "next/link";

export default function All() {
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  console.log(contract);
  const [metadataList, setMetadataList] = useState([]);
  const [tokenIds, setTokenIds] = useState([]);

  useEffect(() => {
    fetchAllNFTs();
  }, []);

  const fetchAllNFTs = async () => {
    try {
      const totalSupply = await contract.methods.totalSupply().call();
      console.log(totalSupply);
      const startFromIndex = BigInt(0);
      // console.log(startFromIndex);

      const endAtIndex = BigInt(totalSupply) - BigInt(1);
      // console.log(endAtIndex);

      const ids = [];
      for (let i = startFromIndex; i <= endAtIndex; i++) {
        const id = await contract.methods.tokenByIndex(i).call();
        // console.log(id);
        ids.push(id);
      }

      setTokenIds(ids);
      // console.log(ids);

      const metadataList = await Promise.all(
        ids.map(async (id) => {
          const tokenURI = await contract.methods.tokenURI(id).call();
          const response = await axios.get(tokenURI);

          // console.log(response);
          return response.data;
        })
      );
      const filteredMetadataList = metadataList.filter((metadata) => metadata);
      setMetadataList(filteredMetadataList);
      // setMetadataList(metadataList);

      // console.log(metadataList);
      // console.log(metadataList[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen border ">
        <div className="flex gap-5 ml-10 mt-20">
          <div className="border flex border-black pb-5 ">
            {tokenIds &&
              metadataList
                .filter(
                  (metadata) =>
                    Array.isArray(metadata.description) && metadata.type === 0
                )
                .map((metadata, index) => (
                  <div key={index} className="w-60 h-60  ">
                    <Link href={`/detail/${tokenIds[index]}`}>
                      <img
                        src={metadataList[index].image}
                        alt="NFT"
                        className="w-60 h-52 gap-10"
                      />
                    </Link>
                    <p className="font-semibold p-1">제목 : {metadata.name}</p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
