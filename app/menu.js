"use client";
import Link from "next/link";
import { useState } from "react";
import "./globals.css";

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
                <img src="menu_open.svg" alt="메뉴버튼" />
              </button>
            </div>
          )}

          {/* 버튼 클릭시 나오는 메뉴 */}
          <ul className={isToggled ? "hidden_menu show" : "hidden_menu"}>
            <div className="menu_close">
              <button onClick={closeMenu}>
                <img src="menu_close.svg" alt="취소버튼" />
              </button>
            </div>

            <li className="menu_list">
              <Link href="/" className="">
                Home
              </Link>
            </li>
            <li className="menu_list">
              <Link href="/mint">Mint</Link>
            </li>
            <li className="menu_list">
              <Link href="/all">All</Link>
            </li>
            <li className="menu_list">
              <Link href="/mypage">My Page</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
