import { z } from "zod";

export const privacySchema = z.object({
  "privacy.title": z.string(),
  "privacy.description": z.string(),
});

// Combined privacyPage schema for validation
export const privacyPageSchema = privacySchema;
