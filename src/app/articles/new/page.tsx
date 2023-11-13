'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { createArticle } from '@/blogAPI';
import { createArticleSupabase } from '@/blogAPISupabase';

const Spiner = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='w-4 h-4 border-t-4 border-white rounded-full animate-spin'></div>
    </div>
  );
};

const CreateBlogPage = () => {
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const data = {
        id: id,
        title: title,
        content: content,
        publisher: '匿名希望',
        category: 'Other',
        image_url: `https://source.unsplash.com/collection/1346951/1000x500?sig=${id}`,
      };

      process.env.NEXT_PUBLIC_API_MODE === '0'
        ? await createArticle(data)
        : await createArticleSupabase(data);

      router.push('/');
      router.refresh();
    } catch (e: any) {
      alert(e.message);
      setIsLoading(false);
    }
  };

  return (
    <div className='py-8 px-4 md:px-12'>
      <h2 className='text-2xl font-bold mb-4'>ブログ新規作成</h2>
      <form
        className='bg-slate-200 p-6 rounded shadow-lg'
        onSubmit={handleSubmit}
      >
        <div className='mb-4'>
          <label className='text-gray-700 text-sm font-bold mb-2'>URL</label>
          <input
            type='text'
            className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none'
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>

        <div className='mb-4'>
          <label className='text-gray-700 text-sm font-bold mb-2'>
            タイトル
          </label>
          <input
            type='text'
            className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className='mb-4'>
          <label className='text-gray-700 text-sm font-bold mb-2'>本文</label>
          <textarea
            className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button
          type='submit'
          className={`py-2 px-4 border rounded-md w-[65.33px] h-[41.33px] ${
            isLoading
              ? 'bg-orange-300 cursor-not-allowed'
              : 'bg-orange-400 hover:bg-orange-500'
          }  `}
          disabled={isLoading}
        >
          {isLoading ? <Spiner /> : '投稿'}
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
