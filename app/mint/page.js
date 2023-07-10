import LoginForm from "../loginform";
import FileUpload from "./mintform";

export default async function Mint() {
  return (
    <div className="min-h-screen flex justify-center items-center wrap ">
      <span className='shape'></span>
      <span className='shape'></span>
      <span className='shape'></span>
      <span className='shape'></span>
      <FileUpload />
      {/* <LoginForm/> */}
    </div>
  );
}
