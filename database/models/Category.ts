// database/models/Category.ts

// database/models/Category.ts

import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the Category document
export interface ICategory extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the Category model
const CategorySchema: Schema<ICategory> = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export the Category model, preventing recompilation in watch mode
export const Category: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
