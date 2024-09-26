"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

function Header() {
  const [displayedText, setDisplayedText] = useState("");
  const [colorIndex, setColorIndex] = useState(0);
  const fullText = "덕덕형의 Shorts 소스 집합소";

  // 사용할 색상 목록을 Tailwind CSS 색상 클래스로 정의
  const colors = [
    "text-red-500",
    "text-orange-500",
    "text-yellow-500",
    "text-green-500",
    "text-blue-500",
    "text-indigo-500",
    "text-purple-500",
  ];

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // 색상을 주기적으로 변경하는 useEffect
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length); // 색상을 순환시키기 위한 인덱스 갱신
    }, 1000); // 1초마다 색상 변경

    return () => clearInterval(colorInterval);
  }, []);

  return (
    <div className="relative w-full h-[150px]">
      <Image
        src="/images/duckduck_banner.jpg"
        alt="duckduck_banner"
        layout="fill"
        objectFit="fill"
      />
      <h1
        className={`
          absolute inset-0 flex justify-center items-center 
          ${colors[colorIndex]} 
          text-[3.5vw] font-bold p-4 shadow-lg
          font-noto-sans
        `}
      >
        {displayedText}
      </h1>
    </div>
  );
}

export default Header;
