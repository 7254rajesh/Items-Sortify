import React from 'react';

function Loading() {
  return (
    <div className='w-full h-full flex justify-center items-center bg-gray-200'>
      <div className='flex items-center'>
        <div className='w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mr-4'></div>
        <h1 className='text-4xl font-semibold text-blue-700'>Loading...</h1>
      </div>
    </div>
  );
}

export default Loading;
