// app/api/products/[id]/route.ts

import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../database';
import { Product } from '../../../../database/models/Product';
import { Category } from '../../../../database/models/Category';



export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    await connectToDatabase();
    const product = await Product.findById(id).populate('category').lean();

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const mappedProduct = {
      id: product._id.toString(),
      title: product.title,
      price: product.price,
      badge: product.badge || '',
      badgeColor: product.badgeColor || 'bg-green-500 hover:bg-green-600',
      images: product.images,
      category: product.category.name,
      qty: product.qty,
      description: product.description,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    return NextResponse.json(mappedProduct);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    await connectToDatabase();
    const { title, category, images, price, qty, description, badge, badgeColor } = await req.json();

    if (!title || !category || !images || price == null || qty == null || !description) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    product.title = title;
    product.category = categoryDoc._id;
    product.images = images;
    product.price = price;
    product.qty = qty;
    product.description = description;
    product.badge = badge || '';
    product.badgeColor = badgeColor || 'bg-green-500 hover:bg-green-600';

    await product.save();

    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    await connectToDatabase();
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
