'use client';

import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/pages/api/web3.config';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function All() {
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  const [metadataList, setMetadataList] = useState([]);

  useEffect(() => {
    fetchAllNFTs();
  }, []);

  const fetchAllNFTs = async () => {
    try {
      const totalSupply = await contract.methods.totalSupply().call();
      // console.log(totalSupply);
      const startFromIndex = BigInt(11);
      // console.log(startFromIndex);

      const endAtIndex = BigInt(totalSupply) - BigInt(1);
      // console.log(endAtIndex);

      const ids = [];
      for (let i = startFromIndex; i <= endAtIndex; i++) {
        const id = await contract.methods.tokenByIndex(i).call();
        // console.log(id);
        ids.push(id);
      }
      // console.log(ids);

      const metadataList = await Promise.all(
        ids.map(async (id) => {
          const tokenURI = await contract.methods.tokenURI(id).call();
          const response = await axios.get(tokenURI);
          console.log(response);
          return response.data;
        })
      );
      // const filteredMetadataList = metadataList.filter((metadata) => metadata);
      // setMetadataList(filteredMetadataList);
      setMetadataList(metadataList);

      console.log(metadataList);
      // console.log(metadataList[0]);

      // console.log(metadataList[1].description[0].type);
      // console.log(metadataList[11].url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='min-h-screen border '>
        <div className='flex gap-5 ml-10 mt-20'>
          <div className='border flex border-black pb-5 '>
            {metadataList
              .filter((metadata) => metadata.description[0].type === 0) // description type이 0인 것만 필터링 0은 일반
              .map((metadata, index) => (
                <div key={index} className='w-60 h-60  '>
                  <Link href={`/detail/${metadataList[index].url}`}>
                    <img
                      src={metadata.image}
                      alt='NFT'
                      className='w-60 h-52 gap-10'
                    />
                  </Link>
                  <p className='font-semibold p-1'>제목 : {metadata.name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

// totalSupply를 호출하여 NFT의 총 공급량을 가져옵니다.
// startFromIndex 변수를 사용하여 검색을 시작할 인덱스를 지정합니다.
// endAtIndex 변수를 사용하여 검색을 종료할 인덱스를 지정합니다.
// ids 배열을 선언하고, 검색된 NFT의 ID를 저장합니다.
// 반복문을 사용하여 tokenByIndex를 호출하여 각 NFT의 ID를 가져옵니다.
// metadataList 배열을 만들기 위해 ids.map() 함수를 사용하여 각 NFT의 메타데이터를 가져옵니다.
// axios.get()을 사용하여 각 NFT의 토큰 URI를 호출하여 응답을 받습니다.
// metadataList 배열에서 filter() 함수를 사용하여 type이 0인 NFT만 필터링하여 새로운 배열 filteredMetadataList를 생성합니다.
// setMetadataList()를 사용하여 filteredMetadataList를 상태로 설정합니다.
// JSX 코드에서 metadataList를 사용하여 이미지를 출력하는 부분입니다.
// metadataList를 filter() 함수를 사용하여 description 배열의 첫 번째 요소의 type이 0인 NFT만 필터링합니다.
// 각 NFT의 이미지를 출력합니다.
