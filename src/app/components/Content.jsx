"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios"; // Axios 임포트
import { ChevronUp, ChevronDown } from "lucide-react";
import debounce from 'lodash.debounce'; // Debounce 임포트

export default function Content({ name }) {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const containerRef = useRef(null);

  useEffect(() => {
    fetchPosts(currentIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, name]);

  const fetchPosts = async (page) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/posts`, {
        params: { community: name, page },
      });
      const data = response.data;

      if (data.posts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...data.posts]);
      }
    } catch (error) {
      console.error("게시글을 불러오는 중 오류가 발생했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = debounce(() => {
    if (!containerRef.current || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setCurrentIndex((prev) => prev + 1);
    } else if (scrollTop === 0 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, 200);

  useEffect(() => {
    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
      handleScroll.cancel();
    };
  }, [handleScroll]);

  return (
    <div className="flex-1 border-l border-r border-gray-200 p-4 relative">
      <h2 className="text-xl font-bold mb-4 text-center">{name} 핫이슈</h2>
      <div
        ref={containerRef}
        className="h-full overflow-y-auto"
      >
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="bg-white shadow-md rounded p-4 mb-4">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="mt-2">{post.content}</p>
            </div>
          ))
        ) : (
          !isLoading && <p className="text-center text-gray-500 mt-4 z-1000">로딩중...</p>
        )}
        {isLoading && <p className="text-center text-gray-500 mt-4 z-1000">로딩중...</p>}
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
