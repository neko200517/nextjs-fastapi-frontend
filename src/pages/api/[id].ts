import { supabase } from '@/utils/supabaseClient';
import { NextApiRequest, NextApiResponse } from 'next';
import { notFound } from 'next/navigation';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return getArticle(req, res);
    case 'DELETE':
      return deleteArticle(req, res);
    default:
      return [];
  }
}

const getArticle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    notFound();
  }

  return res.status(200).json(data);
};

const deleteArticle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { error: deleteError } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (deleteError) {
    return res.status(500).json({ error: deleteError.message });
  }

  return res.status(200).json({ message: 'Sucess Delete' });
};
