
// app/api/categories/route.ts

import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../database';
import { Category } from '../../../database/models/Category';



export const GET = async () => {
  await connectToDatabase();
  const categories = await Category.find().sort({ name: 1 });
  return NextResponse.json(categories);
};

export const POST = async (req: Request) => {
  await connectToDatabase();
  const { name } = await req.json();
  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }
  try {
    const category = new Category({ name });
    await category.save();
    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
