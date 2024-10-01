'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const MatchConnectingPoints = () => {
  const [optionsLeft, setOptionsLeft] = useState(['보기 1', '보기 2', '보기 3']);
  const [optionsRight, setOptionsRight] = useState(['보기 A', '보기 B', '보기 C']);
  const [correctMatches, setCorrectMatches] = useState({ 0: 2, 1: 0, 2: 1 });
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [connections, setConnections] = useState([]);
  const [lines, setLines] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const leftRefs = useRef([]);
  const rightRefs = useRef([]);

  useEffect(() => {
    const updateLines = () => {
      const newLines = connections.map((conn) => {
        const leftElem = leftRefs.current[conn.left];
        const rightElem = rightRefs.current[conn.right];
        if (leftElem && rightElem) {
          const leftRect = leftElem.getBoundingClientRect();
          const rightRect = rightElem.getBoundingClientRect();
          const containerRect = leftElem.parentElement.parentElement.parentElement.getBoundingClientRect();
          return {
            leftX: leftRect.right - containerRect.left,
            leftY: leftRect.top + leftRect.height / 2 - containerRect.top,
            rightX: rightRect.left - containerRect.left,
            rightY: rightRect.top + rightRect.height / 2 - containerRect.top,
          };
        }
        return null;
      }).filter(line => line !== null);
      setLines(newLines);
    };
    updateLines();
    window.addEventListener('resize', updateLines);
    return () => window.removeEventListener('resize', updateLines);
  }, [connections]);

  const handleLeftClick = (id) => {
    if (!isEditing) setSelectedLeft(id);
  };

  const handleRightClick = (id) => {
    if (!isEditing && selectedLeft !== null) {
      if (correctMatches[selectedLeft] === id) {
        setConnections([...connections, { left: selectedLeft, right: id }]);
      }
      setSelectedLeft(null);
    }
  };

  const handleOptionChange = (side, index, value) => {
    if (side === 'left') {
      const newOptionsLeft = [...optionsLeft];
      newOptionsLeft[index] = value;
      setOptionsLeft(newOptionsLeft);
    } else {
      const newOptionsRight = [...optionsRight];
      newOptionsRight[index] = value;
      setOptionsRight(newOptionsRight);
    }
  };

  const handleAddOption = (side) => {
    if (side === 'left') {
      setOptionsLeft([...optionsLeft, `보기 ${optionsLeft.length + 1}`]);
    } else {
      setOptionsRight([...optionsRight, `보기 ${String.fromCharCode(65 + optionsRight.length)}`]);
    }
  };

  const handleRemoveOption = (side, index) => {
    if (side === 'left') {
      const newOptionsLeft = optionsLeft.filter((_, i) => i !== index);
      setOptionsLeft(newOptionsLeft);
      const newCorrectMatches = {};
      Object.keys(correctMatches).forEach(key => {
        if (parseInt(key) < index) {
          newCorrectMatches[key] = correctMatches[key];
        } else if (parseInt(key) > index) {
          newCorrectMatches[parseInt(key) - 1] = correctMatches[key];
        }
      });
      setCorrectMatches(newCorrectMatches);
    } else {
      const newOptionsRight = optionsRight.filter((_, i) => i !== index);
      setOptionsRight(newOptionsRight);
      const newCorrectMatches = {};
      Object.keys(correctMatches).forEach(key => {
        if (correctMatches[key] < index) {
          newCorrectMatches[key] = correctMatches[key];
        } else if (correctMatches[key] > index) {
          newCorrectMatches[key] = correctMatches[key] - 1;
        }
      });
      setCorrectMatches(newCorrectMatches);
    }
    setConnections([]);
  };

  const handleCorrectMatchChange = (leftIndex, rightIndex) => {
    setCorrectMatches({ ...correctMatches, [leftIndex]: rightIndex });
  };

  // Reset all matches
  const handleReset = () => {
    setConnections([]);
    setSelectedLeft(null);
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-8">
      <button
        className="absolute top-4 right-4 bg-indigo-500 text-white px-4 py-2 rounded-md"
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? '완료' : '편집'}
      </button>
      {isEditing && (
        <div className="mb-8 w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">보기 및 정답 설정</h2>
          <div className="flex justify-between">
            <div className="w-1/2 pr-4">
              <h3 className="text-xl font-semibold mb-2">왼쪽 보기</h3>
              {optionsLeft.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange('left', index, e.target.value)}
                    className="border rounded px-2 py-1 mr-2 flex-grow"
                  />
                  <select
                    value={correctMatches[index] || ''}
                    onChange={(e) => handleCorrectMatchChange(index, parseInt(e.target.value))}
                    className="border rounded px-2 py-1 mr-2"
                  >
                    <option value="">정답 선택</option>
                    {optionsRight.map((_, i) => (
                      <option key={i} value={i}>{i + 1}</option>
                    ))}
                  </select>
                  <button onClick={() => handleRemoveOption('left', index)} className="text-red-500">삭제</button>
                </div>
              ))}
              <button onClick={() => handleAddOption('left')} className="text-indigo-500">+ 보기 추가</button>
            </div>
            <div className="w-1/2 pl-4">
              <h3 className="text-xl font-semibold mb-2">오른쪽 보기</h3>
              {optionsRight.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange('right', index, e.target.value)}
                    className="border rounded px-2 py-1 mr-2 flex-grow"
                  />
                  <button onClick={() => handleRemoveOption('right', index)} className="text-red-500">삭제</button>
                </div>
              ))}
              <button onClick={() => handleAddOption('right')} className="text-indigo-500">+ 보기 추가</button>
            </div>
          </div>
        </div>
      )}
      {!isEditing && (
        <div className="relative flex justify-center items-center w-full rounded-md p-8">
          <button
            className="absolute bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={handleReset}
          >
            초기화
          </button>
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {lines.map((line, index) => (
              <motion.line
                key={index}
                x1={line.leftX}
                y1={line.leftY}
                x2={line.rightX}
                y2={line.rightY}
                stroke="#6366F1"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </svg>
          <div className="flex space-x-48">
            <div className="flex flex-col space-y-12">
              {optionsLeft.map((option, index) => {
                const isConnected = connections.some((conn) => conn.left === index);
                return (
                  <motion.div
                    key={index}
                    ref={el => leftRefs.current[index] = el}
                    className={`flex items-center cursor-pointer ${selectedLeft === index ? 'text-indigo-600' : 'text-gray-800'}`}
                    onClick={() => handleLeftClick(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-xl font-semibold">{option}</span>
                    <div className={`w-6 h-6 rounded-full ml-3 ${isConnected ? 'bg-green-600' : (selectedLeft === index ? 'bg-indigo-600' : 'bg-gray-300')}`} />
                  </motion.div>
                );
              })}
            </div>
            <div className="flex flex-col space-y-12">
              {optionsRight.map((option, index) => {
                const isConnected = connections.some((conn) => conn.right === index);
                return (
                  <motion.div
                    key={index}
                    ref={el => rightRefs.current[index] = el}
                    className="flex items-center cursor-pointer text-gray-800"
                    onClick={() => handleRightClick(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`w-6 h-6 ${isConnected ? 'bg-green-600' : 'bg-gray-300'} rounded-full mr-3`} />
                    <span className="text-xl font-semibold">{option}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchConnectingPoints;
