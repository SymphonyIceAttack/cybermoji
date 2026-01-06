import { z } from "zod";

export const contactSchema = z.object({
  "contact.badge": z.string(),
  "contact.title": z.string(),
  "contact.subtitle": z.string(),
  "contact.intro": z.string(),
  "contact.waysTitle": z.string(),
  "contact.emailTitle": z.string(),
  "contact.emailDesc": z.string(),
  "contact.emailAddress": z.string(),
  "contact.faqTitle": z.string(),
  "contact.faqDesc": z.string(),
  "contact.faqLink": z.string(),
  "contact.githubTitle": z.string(),
  "contact.githubDesc": z.string(),
  "contact.githubLink": z.string(),
  "contact.socialTitle": z.string(),
  "contact.socialDesc": z.string(),
  "contact.socialLink": z.string(),
  "contact.helpTitle": z.string(),
  "contact.helpQuestions": z.string(),
  "contact.helpBugs": z.string(),
  "contact.helpFeatures": z.string(),
  "contact.helpFeedback": z.string(),
  "contact.helpPartnership": z.string(),
  "contact.responseTitle": z.string(),
  "contact.responseDesc": z.string(),
  "contact.policies": z.string(),
  "contact.policiesPrivacy": z.string(),
  "contact.policiesTerms": z.string(),
});

// Combined contactPage schema for validation
export const contactPageSchema = contactSchema;
