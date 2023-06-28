import LoginForm from "../loginform";
import FileUpload from "./mintform";

export default async function Mint() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-700 via-indigo-700 to-pink-700">
      <FileUpload />
      {/* <LoginForm/> */}
    </div>
  );
}
