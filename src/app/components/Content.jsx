"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function Content({ name, community }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="flex-1 border-l border-r border-gray-200 p-4 relative bg-gradient-to-b from-blue-50 to-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700 animate-pulse">{name} 핫이슈</h2>
      <div className="h-full overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : currentPosts.length > 0 ? (
          currentPosts.map((post, index) => (
            <div 
              key={post.post_num} 
              className="bg-white shadow-lg rounded-lg p-4 mb-4 transform transition duration-300 hover:scale-[1.02] hover:shadow-xl overflow-hidden"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="h-[4.5em] flex items-center justify-center overflow-hidden">
                <h3 className="text-lg font-semibold line-clamp-2 text-center">
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition duration-300"
                  >
                    {post.title}
                  </a>
                </h3>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4 animate-bounce">게시물이 없습니다.</p>
        )}
      </div>
      <div className="flex justify-center space-x-6 mt-6">
        <button
          onClick={handlePrevPage}
          className={`
            p-3 rounded-full transition-all duration-500 ease-in-out transform
            ${currentPage === 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 hover:-translate-y-1 hover:shadow-lg active:translate-y-0'}
          `}
          disabled={currentPage === 1}
        >
          <ChevronUp size={28} className="animate-bounce" />
        </button>
        <button
          onClick={handleNextPage}
          className={`
            p-3 rounded-full transition-all duration-500 ease-in-out transform
            ${currentPage === totalPages
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 hover:translate-y-1 hover:shadow-lg active:translate-y-0'}
          `}
          disabled={currentPage === totalPages}
        >
          <ChevronDown size={28} className="animate-bounce" />
        </button>
      </div>
      <div className="text-center mt-4 text-sm font-medium text-blue-700">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
