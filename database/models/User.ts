import mongoose, { Schema, Document, Model } from 'mongoose';

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

// Create the schema
const UserSchema = new Schema<IUser>(
  {
    telegramId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    username: {
      type: String,
      default: null,
      sparse: true,
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

// Add error handling for duplicate key errors
UserSchema.post('save', function(error: any, doc: any, next: any) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Telegram ID must be unique'));
  } else {
    next(error);
  }
});

// Create and export the model
export const User = (mongoose.models.User as Model<IUser>) || 
  mongoose.model<IUser>('User', UserSchema);