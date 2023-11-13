'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { deleteArticle } from '@/blogAPI';
import { deleteArticleSupabase } from '@/blogAPISupabase';

type ArticleDeleteButtonProps = {
  id: string;
};

const ArticleDeleteButton = ({ id }: ArticleDeleteButtonProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      process.env.NEXT_PUBLIC_API_MODE === '0'
        ? await deleteArticle(id)
        : await deleteArticleSupabase(id);

      // トップページへ
      router.push('/');
      router.refresh();
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <button
      className='py-2 px-4 rounded-md bg-red-500 hover:bg-red-600'
      onClick={handleDelete}
    >
      削除
    </button>
  );
};

export default ArticleDeleteButton;
