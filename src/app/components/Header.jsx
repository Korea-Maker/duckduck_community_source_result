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
        setDisplayedText(fullText.slice(0, index)); // slice를 사용하여 문자열의 부분을 설정
        index++;
      } else {
        clearInterval(interval);
      }
    }, 200); // 200ms마다 한 글자씩 추가

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <Image 
        src="/images/duckduck_banner.jpg" 
        alt="duckduck_banner" 
        width="1000" 
        height="200" 
        className="object-cover" 
      />
      <h1 className="absolute inset-0 flex justify-center items-center text-blue-500 text-4xl font-bold p-4 shadow-lg">
        {displayedText}
      </h1>
    </div>
  );
}

export default Header;
