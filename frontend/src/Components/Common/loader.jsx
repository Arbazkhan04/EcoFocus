import React from 'react';

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="loader border-t-transparent border-solid rounded-full border-4 w-16 h-16 border-gray-300 animate-spin"></div>
    </div>
  );
}

export default Loader;