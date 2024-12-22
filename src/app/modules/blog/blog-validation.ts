import { z } from "zod";

const BlogValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
  }),
});

const BlogUpdateValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
  }),
});

export const BlogValidation = {
  BlogValidationSchema,
  BlogUpdateValidation,
};
