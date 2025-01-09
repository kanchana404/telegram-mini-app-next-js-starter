// database/models/User.ts

import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the User document
export interface IUser extends Document {
  telegramId: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  photoUrl: string | null;
  type: string;
  title: string | null;
  isBot: boolean;
  isPremium: boolean | null;
  languageCode: string | null;
  allowsWriteToPm: boolean | null;
  addedToAttachmentMenu: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}

// Create the schema for the User model
const UserSchema = new Schema<IUser>(
  {
    telegramId: {
      type: String,
      required: true,
      unique: true,
      index: true, // Ensure fast lookups by telegramId
    },
    username: {
      type: String,
      default: null,
      sparse: true, // Allow unique values even if username is null
    },
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    photoUrl: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    isBot: {
      type: Boolean,
      default: false,
    },
    isPremium: {
      type: Boolean,
      default: null,
    },
    languageCode: {
      type: String,
      default: null,
    },
    allowsWriteToPm: {
      type: Boolean,
      default: null,
    },
    addedToAttachmentMenu: {
      type: Boolean,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Post-save hook for handling duplicate key errors
UserSchema.post('save', function (error: any, doc: any, next: any) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    // Duplicate key error (e.g., telegramId already exists)
    next(new Error('A user with this Telegram ID already exists.'));
  } else {
    next(error);
  }
});

// Export the User model, preventing recompilation in watch mode
export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
