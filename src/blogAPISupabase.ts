import { PostArticle } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 記事一覧取得
export const getAllArticlesSupabase = async () => {
  const res = await fetch(`${API_URL}/api/blog`, { cache: 'no-store' });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
};

// 記事取得
export const getArticleSupabase = async (id: string) => {
  const res = await fetch(`${API_URL}/api/blog/${id}`, {
    next: { revalidate: 60 },
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
};

// 記事作成
export const createArticleSupabase = async (article: PostArticle) => {
  const res = await fetch(`${API_URL}/api/blog`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
};

// 記事の削除
export const deleteArticleSupabase = async (id: string): Promise<Response> => {
  const res = await fetch(`${API_URL}/api/blog/${id}`, {
    method: 'DELETE',
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
};
