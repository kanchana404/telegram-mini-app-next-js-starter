// database/models/Product.ts

// database/models/Product.ts

import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the Product document
export interface IProduct extends Document {
  title: string;
  category: mongoose.Types.ObjectId;
  images: string[];
  price: number;
  qty: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the Product model
const ProductSchema: Schema<IProduct> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    images: {
      type: [String],
      required: true,
      validate: [
        {
          validator: function (images: string[]) {
            return images.length > 0;
          },
          message: 'At least one image is required.',
        },
      ],
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be positive'],
    },
    qty: {
      type: Number,
      required: true,
      min: [0, 'Quantity must be non-negative'],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export the Product model, preventing recompilation in watch mode
export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
