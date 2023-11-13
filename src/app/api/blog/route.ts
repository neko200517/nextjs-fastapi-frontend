import { supabase } from '@/utils/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { data, error } = await supabase.from('posts').select('*');

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: Request) {
  const article = await req.json();
  const { data, error } = await supabase
    .from('posts')
    .insert([{ ...article }])
    .select();

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
