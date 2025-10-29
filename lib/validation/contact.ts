import { z } from "zod";

const baseContactSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(100, "Name must be 100 characters or fewer"),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .or(z.literal(""))
      .optional()
      .transform((value) => {
        const sanitized = value?.trim();
        return sanitized ? sanitized : undefined;
      }),
    phone: z
      .string()
      .trim()
      .min(1, "Phone number is required")
      .transform((value) => value.replace(/\D/g, ""))
      .refine((value) => value.length === 10, {
        message: "Please enter a valid 10-digit US phone number",
      })
      .transform(
        (value) => `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`
      ),
    message: z
      .string()
      .trim()
      .min(1, "Message is required")
      .max(1000, "Message must be 1000 characters or fewer"),
  })
  .strict();

const recaptchaSchema = z.object({
  recaptchaToken: z
    .string()
    .min(1, "Verification failed. Please refresh the page and try again."),
});

export const contactFormSchema = baseContactSchema;
export const contactSubmissionSchema = baseContactSchema.merge(recaptchaSchema);

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ContactSubmissionValues = z.infer<typeof contactSubmissionSchema>;
