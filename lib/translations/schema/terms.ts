import { z } from "zod";

export const termsSchema = z.object({
  "terms.title": z.string(),
  "terms.description": z.string(),
});

// Combined termsPage schema for validation
export const termsPageSchema = termsSchema;
