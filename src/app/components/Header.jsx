"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

function Header() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "덕덕형의 쇼츠 소스 집합소";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[200px] overflow-hidden bg-blue-100">
      <Image
        src="/images/duckduck_banner.jpg"
        alt="duckduck_banner"
        layout="fill"
        objectFit="cover"
        className="opacity-70"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-2 drop-shadow-md font-cute">
          {displayedText}
        </h1>
        <div className="flex space-x-2">
          {['bg-yellow-300', 'bg-pink-300', 'bg-blue-300', 'bg-green-300'].map((color, index) => (
            <div key={index} className={`w-3 h-3 ${color} rounded-full animate-bounce`} style={{animationDelay: `${index * 0.1}s`}}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
