import React from 'react';
import { Article } from '@/types';
import { ArticleCard } from './ArticleCard';

type ArticleListProps = {
  articles: Article[];
};

const ArticleList = async ({ articles }: ArticleListProps) => {
  return (
    <div>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
