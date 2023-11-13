import { Article, PostArticle } from './types';
import { notFound } from 'next/navigation';
import { ErrorResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_FAST_API_URL;

// 全記事を取得
export const getAllArticles = async (): Promise<Article[]> => {
  const res = await fetch(`${API_URL}/posts`, { cache: 'no-store' }); // SSR

  if (!res.ok) {
    throw new Error('エラーが発生しました。');
  }

  // await new Promise((resolve) => setTimeout(resolve, 1500));

  return await res.json();
};

// 記事の取得
export const getArticle = async (id: string): Promise<Article> => {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    next: { revalidate: 60 },
  }); // ISR

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error('エラーが発生しました。');
  }

  const article = (await res.json()) as Article;
  return article;
};

// 記事の作成
export const createArticle = async (article: PostArticle): Promise<Article> => {
  const currentDatetime = new Date().toISOString();

  const res = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...article, created_at: currentDatetime }),
  });

  if (!res.ok) {
    const json = (await res.json()) as ErrorResponse;
    if (json) {
      throw new Error(json.message);
    }
    throw new Error(res.statusText);
  }

  const newArticle = await res.json();
  return newArticle;
};

// 記事の削除
export const deleteArticle = async (id: string): Promise<Response> => {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res;
};
