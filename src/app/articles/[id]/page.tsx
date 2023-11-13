import React from 'react';
import Image from 'next/image';
import ArticleDeleteButton from '@/app/components/ArticleDeleteButton';
import { getArticle } from '@/blogAPI';
import { getArticleSupabase } from '@/blogAPISupabase';

const Article = async ({ params }: { params: { id: string } }) => {
  const article =
    process.env.NEXT_PUBLIC_API_MODE === '0'
      ? await getArticle(params.id)
      : await getArticleSupabase(params.id);

  return (
    <div className='max-w-3xl mx-auto p-5'>
      <Image src={article.image_url} alt='' width={1280} height={300} />
      <h1 className='text-4xl text-center mb-10 mt-10'>{article.title}</h1>
      <div className='text-lg leading-relaxed text-justify'>
        <p>{article.content}</p>
      </div>
      <div className='text-right mt-4'>
        <ArticleDeleteButton id={params.id} />
      </div>
    </div>
  );
};

export default Article;
