"use client";

import React, { useEffect, useState } from "react";
import axios from "axios"; // Axios 임포트
import { ChevronUp, ChevronDown } from "lucide-react";

export default function Content({ name, community }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  useEffect(() => {
    // 커뮤니티가 변경되면 첫 페이지로 리셋
    setCurrentPage(1);
    fetchPosts();
  }, [community]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://duckduck.jongwook.xyz/posts/${community}`);
      const data = response.data;
  
      if (data.posts) {
        const processedPosts = data.posts.map(post => {
          let title = post[1];
          
          // 제일 처음의 대괄호와 다음 두 글자를 제거
          if (title.startsWith('[')) {
            const closingBracketIndex = title.indexOf(']');
            if (closingBracketIndex !== -1) {
              title = title.slice(closingBracketIndex + 1).trim();
            }
          }

          let lastIndex = title.lastIndexOf('[');
          if (lastIndex !== -1 && title.endsWith(']')) {
            let numberPart = title.substring(lastIndex + 1, title.length - 1);
            if (/^\d+$/.test(numberPart)) {
              title = title.substring(0, lastIndex).trim();
            }
          }
          
          return {
            post_num: post[0],
            title: title,
            link: post[2],
            views: post[3],
            likes: post[4]
          };
        });
  
        setPosts(processedPosts);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error("게시글을 불러오는 중 오류가 발생했습니다:", error);
      setPosts([]);  // 오류 발생 시 빈 리스트를 설정
    } finally {
      setIsLoading(false);
    }
  };

  // 총 페이지 수 계산
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // 현재 페이지에 표시할 게시글 슬라이스
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 네비게이션 핸들러
  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="flex-1 border-l border-r border-gray-200 p-4 relative">
      <h2 className="text-xl font-bold mb-4 text-center">{name} 핫이슈</h2>
      <div className="h-full overflow-y-auto">
        {isLoading ? (
          <p className="text-center text-gray-500 mt-4 z-1000">로딩중...</p>
        ) : currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <div key={post.post_num} className="bg-white shadow-md rounded p-2 mb-2 md:p-4 md:mb-4 h-20 flex items-center justify-center">
              <h3 className="text-sm md:text-lg font-semibold line-clamp-2">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  {post.title}
                </a>
              </h3>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4 z-1000">게시물이 없습니다.</p>
        )}
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={handlePrevPage}
          className="bg-blue-500 text-white p-2 rounded-full disabled:opacity-50 transform transition hover:scale-105 active:scale-95"
          disabled={currentPage === 1}
        >
          <ChevronUp size={24} />
        </button>
        <button
          onClick={handleNextPage}
          className="bg-blue-500 text-white p-2 rounded-full disabled:opacity-50 transform transition hover:scale-105 active:scale-95"
          disabled={currentPage === totalPages}
        >
          <ChevronDown size={24} />
        </button>
      </div>
      <div className="text-center mt-2">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
