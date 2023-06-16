'use client';
import { useState } from 'react';

export default function MintForm() {
  const [title, setTitle] = useState(''); // 제목
  const [description, setDescription] = useState(''); // 내용
  let [src, setSrc] = useState(''); //이미지

//   if (title === '') {
//     alert('추억의 제목을 입력해주세요.');
//   }
//   if (description === '') {
//     alert('추억의 내용을 적어주세요.');
//   }
  return (
    <form action='./api/post/create' method='POST'>
        <div className='flex justify-center  gap-10'>
      <div>
        <p className=' font-bold text-2xl'>추억 민팅하기</p>
        <p>지원 가능한 파일형식(jpeg, jpg, webp, png, bmp) 최대 크기 1MB</p>
        <input
          className='mb-2'  
          name='image'
          type='file'
          accept='image/*'
          onChange={async (e) => {
            let file = e.target.files[0];
            let filename = encodeURIComponent(file.name);
            let res = await fetch('/api/post/image?file=' + filename);
            res = await res.json();

            const formData = new FormData();
            Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
              formData.append(key, value);
            });
            let result = await fetch(res.url, {
              method: 'POST',
              body: formData,
            });
            console.log(result);

            if (result.ok) {
              const imageUrl = URL.createObjectURL(file);
              setSrc(imageUrl);
            } else {
              console.log('실패');
            }
          }}
        />
        <img src={src} className='w-[400px] h-[300px]'/>
      </div>
      <div>
        <div className='mb-4'>
          <p className=' font-bold text-2xl'>제목</p>
          <p>추억의 제목을 입력해주세요.</p>
          <input
            type='text'
            name='title'
            className='border-2 border-gray-400 w-[400px] rounded-md'
          ></input>
        </div>
        <div className='mb-4'>
          <p className=' font-bold text-2xl'>설명</p>
          <p>이 추억에 대해 간략하게 소개해주세요.</p>
          <input
            type='text'
            name='description'
            className='border-2 border-gray-400 w-[400px] rounded-md'
          ></input>
        </div>
        <div>
          <button
            type='submit'
            className=' bg-slate-300 w-[400px] hover:bg-violet-200 rounded-md shadow-md shadow-indigo-400 font-semibold'
          >
            추억 민팅
          </button>
        </div>
      </div>
      </div>
    </form>
  );
}
