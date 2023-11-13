'use client';

import React, { useEffect } from 'react';

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='bg-red-100 border-l-4 border-red-500 text-red-700 mt-4 rounded shadow-md mx-auto p-2'>
      <h3 className='font-bold mb-2'>エラーが発生しました。</h3>
      <p className='mb-2'>{error.message}</p>
      <button
        className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 duration-200'
        onClick={reset}
      >
        もう一度試す
      </button>
    </div>
  );
};

export default Error;
