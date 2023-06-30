'use client';
import { useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/pages/api/web3.config';

const FileUpload = () => {
  const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;
  const [selectedFile, setSelectedFile] = useState();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(); // 미리 보여주는 이미지
  const [isCheckedNormal, setIsCheckedNormal] = useState(false);
  const [isCheckedTimeCapsule, setIsCheckedTimeCapsule] = useState(false);

  const [type, setType] = useState(0); //타입설정

  const web3 = new Web3(window.ethereum);
  // console.log(web3);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  // console.log(contract);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { name } = event.target;
    if (name === 'normal') {
      setIsCheckedNormal(true);
      setIsCheckedTimeCapsule(false);
      setType(0);
    } else if (name === 'timecapsule') {
      setIsCheckedNormal(false);
      setIsCheckedTimeCapsule(true);
      setType(1);
    }
  };

  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const handleSubmission = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const address = accounts[0];
    console.log(address);

    const formData = new FormData();

    formData.append('file', selectedFile);

    const metadata = JSON.stringify({
      name: 'file name',
    });
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', options);

    try {
      const res = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          maxBodyLength: Infinity,
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: `Bearer ${PINATA_JWT}`,
          },
        }
      );
      console.log(res.data);

      const fileHash = res.data.IpfsHash;

      const time =
        type === 0
          ? 0
          : selectedPeriod === 'week'
          ? 604800
          : selectedPeriod === 'month'
          ? 2592000
          : 31536000;
      // });
          const mintTime = new Date();
          console.log(mintTime);
      const res2 = await axios.post(
        'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        {
          name: title,
          description: [
            {
              content: content,
              type: type,
              time: mintTime,
            },
          ],
          type: type, //nft 노말인지 타임캡슐인지
          url: fileHash,
          image: `https://aqua-hushed-falcon-648.mypinata.cloud/ipfs/${fileHash}`,
        },
        {
          headers: {
            Authorization: `Bearer ${PINATA_JWT}`,
          },
        }
      );
      const metadata = res2.data.IpfsHash;
      // const timestamp = res2.data.Timestamp;
      console.log(res2.data);

      const res3 = await contract.methods
        .mintNFT(
          `https://aqua-hushed-falcon-648.mypinata.cloud/ipfs/${res2.data.IpfsHash}`,
          time
        )
        .send({ from: address });
      console.log(res3);

      alert('민팅이 완료되었습니다.');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex gap-20'>
      <div className='mb-4'>
        <p className=' font-bold text-2xl '>추억 민팅하기</p>
        <p>지원 가능한 파일형식(jpeg, jpg, webp, png, bmp)</p>
        <input type='file' onChange={changeHandler} className='border mt-2' />
        <div className='w-[350px] h-[200px]'>
          {file && (
            <img
              src={URL.createObjectURL(file)}
              className=' w-[100%] h-[100%] mt-2'
            />
          )}
        </div>
      </div>

      <div className='mb-4'>
        <p className=' font-bold text-2xl '>제목</p>
        <p>추억의 제목을 입력해주세요.</p>
        <input
          type='text'
          value={title}
          onChange={handleTitleChange}
          className='border w-[400px] '
        />

        <p className=' font-bold text-2xl mt-2'>설명</p>
        <p>추억에 대해 간략하게 소개해주세요.</p>
        <input
          type='text'
          value={content}
          onChange={handleContentChange}
          className='border w-[400px]'
        />

        <p className=' font-bold text-2xl mt-2'>타입</p>
        <p>원하는 타입을 선택해주세요.</p>
        <span>
          <input
            type='checkbox'
            name='normal'
            value={type}
            checked={isCheckedNormal}
            onChange={handleCheckboxChange}
          />
          일반
        </span>
        <span>
          <input
            type='checkbox'
            name='timecapsule'
            value={type}
            checked={isCheckedTimeCapsule}
            onChange={handleCheckboxChange}
          />
          타임캡슐
        </span>

        {isCheckedTimeCapsule && (
          <div className='mb-4'>
            <p className='font-bold text-2xl'>기간</p>
            <p>원하는 기간을 선택해주세요.</p>
            <input
              type='radio'
              name='timestamp'
              value='week'
              checked={selectedPeriod === 'week'}
              onChange={handlePeriodChange}
            />
            7일
            <input
              type='radio'
              name='timestamp'
              value='month'
              checked={selectedPeriod === 'month'}
              onChange={handlePeriodChange}
            />
            30일
            <input
              type='radio'
              name='timestamp'
              value='year'
              checked={selectedPeriod === 'year'}
              onChange={handlePeriodChange}
            />
            365일
          </div>
        )}

        <div className='mt-4'>
          <button
            onClick={handleSubmission}
            className=' bg-slate-300 w-[400px] hover:bg-violet-200 rounded-md shadow-md shadow-indigo-400 font-semibold'
          >
            추억민팅하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
