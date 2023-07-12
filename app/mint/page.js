import LoginForm from '../loginform';
import FileUpload from './mintform';

export default async function Mint() {
  return (
    <div className='wrap '>
      <div
        className='font-Jalnan text-3xl pt-5 flex items-center justify-center'
        style={{
          background: 'linear-gradient(to right, pink, white)',
          borderImage: 'linear-gradient(to right, pink, white) 1',
          WebkitTextFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
        }}
      >
        MINT PAGE
      </div>
      <div className='min-h-screen  flex flex-col justify-center items-center '>
        <FileUpload />
      </div>
      <span className='shape'></span>
      <span className='shape'></span>
      <span className='shape'></span>
      <span className='shape'></span>
      {/* <LoginForm/> */}
    </div>
  );
}
