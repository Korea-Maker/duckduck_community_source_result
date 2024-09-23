import React from 'react'

function Footer({ className }) {
  return (
    <footer className="bg-sky-300 bg-opacity-20 text-gray-800 py-6 shadow-lg">
      <div className={`${className} container mx-auto px-4`}>
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-xl font-semibold italic text-center">덕덕형...... 나 힘두로.....</h1>
          <div className="w-16 h-1 bg-sky-500 rounded-full"></div>
          <p className="text-sm font-medium tracking-wide">
            &copy; {new Date().getFullYear()} ZeroCoke. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
