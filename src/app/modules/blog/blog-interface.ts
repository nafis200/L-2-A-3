

import { ObjectId } from 'mongoose';

export interface TBlogPost {
  title: string;         
  content: string;        
  author: ObjectId;       
  isPublished: boolean;   
}
