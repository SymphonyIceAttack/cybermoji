import { z } from "zod";

export const guidesSchema = z.object({
  "guides.emojiBasics": z.string(),
  "guides.emojiTrends": z.string(),
  "guides.expressionGuide": z.string(),
});

// Combined guidesPage schema for validation
export const guidesPageSchema = guidesSchema;
