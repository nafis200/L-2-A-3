import { Schema, model } from 'mongoose';
import type { TBlogPost } from './blog-interface';

const blogPostSchema = new Schema<TBlogPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true, 
    },
  },
  {
    timestamps: true, 
  }
);

export const BlogPostModel = model<TBlogPost>('BlogPost', blogPostSchema);
