export type Article = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  publisher: string;
  category: string;
  image_url: string;
};

export type PostArticle = {
  id: string;
  title: string;
  content: string;
  created_at?: string;
  publisher?: string;
  category?: string;
  image_url?: string;
};

export type ErrorResponse = {
  error_code: number;
  message: string;
  log: string;
};
