"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

function Header() {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = '덕덕형의 Shorts 소스 집합소';

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

  return (
    <div className="relative w-full h-[250px]"> {/* 여기에 원하는 높이를 추가 */}
      <Image 
        src="/images/duckduck_banner.jpg" 
        alt="duckduck_banner" 
        layout="fill" // Fill로 변경
        objectFit="cover" // 이미지 크기 조정
      />
      <h1 className="absolute inset-0 flex justify-center items-center text-blue-500 text-[5vw] font-bold p-4 shadow-lg">
        {displayedText}
      </h1>
    </div>
  );
}

export default Header;
