// app/api/products/route.ts

// app/api/products/route.ts

import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../database';
import { Product } from '../../../database/models/Product';
import { Category } from '../../../database/models/Category';



export const GET = async () => {
  try {
    await connectToDatabase();
    const products = await Product.find().populate('category').sort({ createdAt: -1 }).lean();

    // Map products to include id from _id and convert category to name
    const mappedProducts = products.map((product: any) => ({
      id: product._id.toString(),
      title: product.title,
      price: product.price,
      badge: product.badge || '',
      badgeColor: product.badgeColor || 'bg-green-500 hover:bg-green-600', // default badge color
      image: product.images[0], // assuming images is an array
      category: product.category.name
    }));

    return NextResponse.json(mappedProducts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  await connectToDatabase();
  const { title, category, images, price, qty, description } = await req.json();
  if (!title || !category || !images || price == null || qty == null || !description) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }
  try {
    // Find the category by name
    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    const product = new Product({ title, category: categoryDoc._id, images, price, qty, description });
    await product.save();
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
