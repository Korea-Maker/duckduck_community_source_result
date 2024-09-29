import React from 'react'
import { FaHeart, FaCoffee } from 'react-icons/fa'

function Footer({ className }) {
  return (
    <footer className="bg-gradient-to-r from-sky-200 to-indigo-200 text-gray-800 py-8 shadow-lg">
      <div className={`${className} container mx-auto px-4`}>
        <div className="flex flex-col items-center justify-center space-y-6">
          <h1 className="text-2xl font-bold italic text-center flex items-center">
            덕덕형...... 나 힘두로.....
            <FaCoffee className="ml-2 text-brown-500 animate-bounce" />
          </h1>
          <div className="w-24 h-1 bg-sky-500 rounded-full"></div>
          <p className="text-sm font-medium tracking-wide flex items-center">
            Made with <FaHeart className="mx-1 text-red-500 animate-pulse" /> by ZeroCoke
          </p>
          <p className="text-xs font-medium tracking-wide text-gray-600">
            &copy; {new Date().getFullYear()} ZeroCoke. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
