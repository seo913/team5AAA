"use client";
import Link from "next/link";
import { useState } from "react";
import "./globals.css";
import LoginForm from "./loginform";

export default function Menu() {
  const [isToggled, setIsToggled] = useState(false);

  const toggleMenu = () => {
    setIsToggled(!isToggled);
  };

  const closeMenu = () => {
    setIsToggled(false);
  };

  return (
    <div>
      <div className="header">
        <div className="menu">
          {isToggled ? null : (
            <div className="menubtn">
              <button onClick={toggleMenu}>
                <img
                  src="menu_open.svg"
                  alt="메뉴버튼"
                  className="menu_color"
                />
              </button>
            </div>
          )}

          <ul className={isToggled ? "hidden_menu show" : "hidden_menu"}>
            <div className="menu_close">
              <button onClick={closeMenu}>
                <img src="menu_close.svg" alt="취소버튼" />
              </button>
            </div>

            <div className="menu_box">
              <li className="menu_list">
                <Link href="/" className="list_color">
                  Home
                </Link>
              </li>
              <li className="menu_list">
                <Link href="/mint" className="list_color">
                  Mint
                </Link>
              </li>
              <li className="menu_list">
                <Link href="/all" className="list_color">
                  All
                </Link>
              </li>
              <li className="menu_list">
                <Link href="/mypage" className="list_color">
                  My Page
                </Link>
              </li>
            </div>
          </ul>
        </div>

        {/* <div className="logo">
          <img src="logo_1-3.png" alt="로고"/>
        </div> */}

        <div className="header_video">
          <video autoPlay muted loop>
            <source src="/video/banner1.mp4" type="video/mp4" />
          </video>
          <div className="video_font">
            <p>Time Snap</p>
          </div>
        </div>

        <div className="wallet">
          <img src="metamask.svg" alt="메타마스크" />
          <LoginForm />
        </div>

      </div>
    </div>
  );
}
