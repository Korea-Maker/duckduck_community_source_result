"use client";

import React, { useEffect, useState, useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function Content({ name }) {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    // 초기 데이터 로드
    fetchPosts(currentIndex);
  }, [currentIndex, name]);

  const fetchPosts = async (page) => {
    try {
      const response = await fetch(`/api/posts?community=${name}&page=${page}`);
      const data = await response.json();
      if (data.posts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...data.posts]);
      }
    } catch (error) {
      console.error("게시글을 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  const handleScroll = () => {
    if (!containerRef.current || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setCurrentIndex((prev) => prev + 1);
    } else if (scrollTop === 0 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex-1 border-l border-r border-gray-200 p-4 relative">
      <h2 className="text-xl font-bold mb-4 text-center">{name} 핫이슈</h2>
      <div
        ref={containerRef}
        className="h-full overflow-y-auto"
        onScroll={handleScroll}
      >
        {posts[currentIndex] ? (
          <div className="bg-white shadow-md rounded p-4">
            <h3 className="text-lg font-semibold">{posts[currentIndex].title}</h3>
            <p className="mt-2">{posts[currentIndex].content}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4 z-1000">로딩중...</p>
        )}
      </div>
      <div className="absolute bottom-30 left-0 right-0 flex justify-center space-x-4">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
          className="bg-blue-500 text-white p-2 rounded-full"
          disabled={currentIndex === 0}
        >
          <ChevronUp size={24} />
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          className="bg-blue-500 text-white p-2 rounded-full"
          disabled={!hasMore}
        >
          <ChevronDown size={24} />
        </button>
      </div>
    </div>
  );
}
