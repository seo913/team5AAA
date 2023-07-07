'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { contract } from '@/pages/api/web3.config';

export default function All() {
  // console.log(contract);
  const [metadataList, setMetadataList] = useState([]);
  const [tokenIds, setTokenIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //페이지 로딩기능
  const [metadataListWithTokenId, setMetadataListWithTokenId] = useState([]);

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
          return {
            ...response.data,
            tokenId: id, // 토큰 아이디를 metadata 객체에 추가
          };
        })
      );
      setMetadataListWithTokenId(metadataList);
      const filteredMetadataList = metadataList.filter((metadata) => metadata);
      setMetadataList(filteredMetadataList);
      setIsLoading(false);

      // setMetadataList(metadataList);

      // console.log(metadataList);
      // console.log(metadataList[20]);
      // console.log(tokenIds);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        style={{
          background: 'linear-gradient(to right, pink, white)',
          borderImage: 'linear-gradient(to right, pink, white) 1',
          WebkitTextFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
        }}
      >
        <div className='flex justify-center font-Jalnan text-2xl'>
          <p className='mt-10'>ALL PAGE</p>
        </div>

        <div className='flex flex-wrap gap-5 justify-center'>
          {isLoading ? (
            <div className='flex items-center justify-center w-full h-full'>
              <p className='font-bold text-3xl pt-[300px]'>Loading...</p>
            </div>
          ) : (
            tokenIds &&
            metadataListWithTokenId
              .filter((metadata) => metadata.type === 0)
              .map((metadata) => {
                const { tokenId, image, name } = metadata;

                return (
                  <div
                    key={tokenId}
                    className='mt-5 border-gray-400 backdrop-blur-sm bg-white/20 w-[242px] h-[298px] rounded-lg'
                  >
                    <div className='w-60 h-64 flex flex-col items-center'>
                      <Link href={`/detail/${tokenId}`}>
                        <div className='rounded-md '>
                          <img
                            src={image}
                            alt='NFT'
                            className='w-52 h-52 mt-3 rounded-md transition-transform duration-300 transform hover:scale-105'
                          />
                        </div>
                      </Link>
                    </div>

                    <div className='flex items-center backdrop-blur-sm bg-white/30 h-10 rounded-b-lg'>
                      <p
                        className='pl-4 text-md font-semibold'
                        style={{
                          background: 'linear-gradient(to right, pink, white)',
                          borderImage:
                            'linear-gradient(to right, pink, white) 1',
                          WebkitTextFillColor: 'transparent',
                          WebkitBackgroundClip: 'text',
                        }}
                      >
                        TITLE: {name}
                      </p>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </>
  );
}
