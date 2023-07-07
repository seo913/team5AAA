'use client';
import { useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/pages/api/web3.config';
import { useRouter } from 'next/navigation';

const FileUpload = () => {
  const router = useRouter(); // 페이지 이동 기능
  const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT; //피나타 api jwt
  const [selectedFile, setSelectedFile] = useState();  //파일 업로드
  const [title, setTitle] = useState(''); //제목
  const [content, setContent] = useState(''); //내용
  const [file, setFile] = useState(); // 미리 보여주는 이미지
  const [isCheckedNormal, setIsCheckedNormal] = useState(false); //노말타입체크
  const [isCheckedTimeCapsule, setIsCheckedTimeCapsule] = useState(false); //타임캡슐타입체크

  const [type, setType] = useState(0); //타입설정

  const web3 = new Web3(window.ethereum); // 이더리움연결
  // console.log(web3);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS); //컨트랙트,abi연결
  // console.log(contract);

  const changeHandler = (event) => { //어떤 추억인지 
    setSelectedFile(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => { //추억의 제목을 설정할수있게
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => { //추억의 내용을 설정할수있게
    setContent(event.target.value);
  };

  const handleCheckboxChange = (event) => { // 추억의 타입이 0이면 일반 노말로 선택이 되고 타입이 1이면 타임캡슐로 설정을 할 수 있게
    const { name } = event.target;
    if (name === "normal") {
      setIsCheckedNormal(true);
      setIsCheckedTimeCapsule(false);
      setType(0);
    } else if (name === "timecapsule") {
      setIsCheckedNormal(false);
      setIsCheckedTimeCapsule(true);
      setType(1);
    }
  };

  const [selectedPeriod, setSelectedPeriod] = useState('week'); //타임캡슐 기간 단위를 설정하는 것

  const handlePeriodChange = (event) => { //타임캡슐 기능 버튼 클릭할 수 있게
    setSelectedPeriod(event.target.value);
  };

  const handleSubmission = async () => { //민팅버튼 
    alert('민팅을 진행하시려면 확인을 누르고 잠시만 기다려주세요.');

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];
    // console.log(address);

    const formData = new FormData();

    formData.append("file", selectedFile);

    const metadata = JSON.stringify({
      name: "file name",
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: Infinity,
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: `Bearer ${PINATA_JWT}`,
          },
        }
      );
      // console.log(res.data);

      const fileHash = res.data.IpfsHash;

      const time =
        type === 0
          ? 0
          : selectedPeriod === "week"
          ? 604800
          : selectedPeriod === "month"
          ? 2592000
          : 31536000;
      // });
      const mintTime = new Date();
      // console.log(mintTime);
      const res2 = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        {
          name: title,
          description: [
            {
              content: content,
              time: mintTime,
            },
          ],
          type: type, //nft 노말인지 타임캡슐인지
          account: address,
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
      // console.log(res2.data);

      const res3 = await contract.methods
        .mintNFT(
          `https://aqua-hushed-falcon-648.mypinata.cloud/ipfs/${res2.data.IpfsHash}`,
          time
        )
        .send({ from: address });

      // console.log(res2.data);
      alert('민팅이 완료되었습니다.');
      router.push('/');
      console.log(res3);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-20">
      <div className="p-4">
        {/* <div className="w-[450px] h-[450px] border rounded-t-3xl border-gray-300 backdrop-blur-sm bg-white/20 flex justify-center items-center"> */}
        <div
          className={`w-[450px] h-[450px] rounded-t-3xl backdrop-blur-sm bg-white/20 flex justify-center items-center ${
            file ? "border border-gray-500" : "border border-gray-300"
          }`}
        >
          {!file && (
            <div className=" font-Jalnan text-3xl text-white">사진 업로드</div>
          )}

          {file && (
            <img
              src={URL.createObjectURL(file)}
              className=" w-[100%] h-[100%] rounded-t-3xl"
            />
          )}
        </div>
        <div className="bg-zinc-800 p-4 rounded-b-3xl ">
          <p className=" font-Jalnan text-3xl text-white">추억 민팅하기</p>
          <p className="ml-1 my-2 text-slate-400 text-xs">
            *지원 가능한 파일형식(jpeg, jpg, webp, png, bmp)
          </p>
          <input
            type="file"
            onChange={changeHandler}
            className="text-sm text-slate-200
          file:mr-5 file:py-3 file:px-10
          file:rounded-2xl file:border-0
          file:text-md file:font-Jalnan  file:text-white
          file:bg-gradient-to-r file:from-blue-600 file:to-purple-600
          hover:file:cursor-pointer hover:file:opacity-80
        "
          />
        </div>
      </div>

      <div className="p-4 pt-16 flex flex-col">
        <div className="mb-5">
          <p className=" font-bold text-3xl mb-2 font-Jalnan text-white">
            TITLE
          </p>
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="추억의 제목을 입력해주세요."
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        <div className="mb-5">
          <p className=" font-bold text-3xl mb-2 font-Jalnan text-white">
            DESCRIPTION
          </p>
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="추억에 대해 간략하게 소개해주세요."
            type="text"
            value={content}
            onChange={handleContentChange}
          />
        </div>

        <div className="mb-5">
          <p className=" font-bold text-3xl mb-2 font-Jalnan text-white">
            REVEAL-TYPE
          </p>
          <span className="font-mono text-white mr-4">
            <input
              type="checkbox"
              name="normal"
              value={type}
              checked={isCheckedNormal}
              onChange={handleCheckboxChange}
              className="mr-1 accent-pink-500"
            />
            Reveal Now
          </span>
          <span className="font-mono text-white">
            <input
              type="checkbox"
              name="timecapsule"
              value={type}
              checked={isCheckedTimeCapsule}
              onChange={handleCheckboxChange}
              className="mr-1 accent-pink-500"
            />
            Time Capsule
          </span>
          <p className="text-slate-400 text-xs ml-1">
            *Time Capsule feature reveals your memories in the future.
          </p>
        </div>

        {isCheckedTimeCapsule && (
          <div className="mb-5">
            <p className="font-bold text-3xl mb-2 font-Jalnan text-white">
              DURATION
            </p>
            <span className="font-mono text-white mr-4">
              <input
                type="radio"
                name="timestamp"
                value="week"
                checked={selectedPeriod === "week"}
                onChange={handlePeriodChange}
                className="mr-1 accent-pink-500"
              />
              7 Days
            </span>
            <span className="font-mono text-white mr-4">
              <input
                type="radio"
                name="timestamp"
                value="month"
                checked={selectedPeriod === "month"}
                onChange={handlePeriodChange}
                className="mr-1 accent-pink-500"
              />
              30 Days
            </span>
            <span className="font-mono text-white mr-4">
              <input
                type="radio"
                name="timestamp"
                value="year"
                checked={selectedPeriod === "year"}
                onChange={handlePeriodChange}
                className="mr-1 accent-pink-500"
              />
              365 Days
            </span>
          </div>
        )}

        <div>
          <button
            onClick={handleSubmission}
            className=" w-[400px] py-3 px-10
            rounded-2xl border-0
            text-md font-Jalnan  text-white
            bg-gradient-to-r from-blue-600 to-purple-600
            hover:cursor-pointer hover:opacity-80"
          >
            TimeSnap
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
