"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validation/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
  FieldMessage,
} from "@/components/ui/field";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

type SubmissionState = {
  type: "success" | "error";
  message: string;
};

const defaultValues: Partial<ContactFormValues> = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const sanitizePhoneDigits = (value: string) =>
  value.replace(/\D/g, "").slice(0, 10);

const formatPhoneDigits = (digits: string) => {
  if (digits.length === 0) {
    return "";
  }

  if (digits.length <= 3) {
    return `(${digits}`;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

export default function ContactForm() {
  const [submissionState, setSubmissionState] =
    useState<SubmissionState | null>(null);
  const {
    handleSubmit,
    register,
    reset,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: "onTouched",
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmissionState(null);

    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

      if (!siteKey) {
        throw new Error("reCAPTCHA site key is not configured.");
      }

      const token = await new Promise<string>((resolve, reject) => {
        if (typeof window === "undefined") {
          reject(new Error("reCAPTCHA can only run in the browser."));
          return;
        }

        const grecaptcha = window.grecaptcha;

        if (!grecaptcha) {
          reject(new Error("reCAPTCHA has not loaded yet."));
          return;
        }

        grecaptcha.ready(() => {
          grecaptcha
            .execute(siteKey, { action: "contact_form" })
            .then(resolve)
            .catch(reject);
        });
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          recaptchaToken: token,
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));

        if (result?.errors && typeof result.errors === "object") {
          Object.entries(result.errors).forEach(([field, messages]) => {
            if (!messages) {
              return;
            }

            const message = Array.isArray(messages) ? messages[0] : messages;
            setError(field as keyof ContactFormValues, {
              type: "server",
              message: String(message),
            });
          });
        }

        setSubmissionState({
          type: "error",
          message:
            result?.message ??
            "We couldn't submit your request. Please review the form and try again.",
        });

        return;
      }

      setSubmissionState({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });
      reset(defaultValues);
    } catch (error) {
      console.error("Failed to submit contact request.", error);
      setSubmissionState({
        type: "error",
        message:
          "Something went wrong on our end. Please refresh the page and try again.",
      });
    }
  };

  return (
    <div className="rounded-xl border border-green-100 bg-white/80 p-6 shadow-md backdrop-blur">
      <h3 className="text-2xl font-semibold text-green-800">
        Send Us a Message
      </h3>
      <p className="mt-2 text-sm text-gray-600">
        Use the form below to tell us how we can help. We&apos;ll respond as
        soon as possible.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 grid grid-cols-1 gap-4"
        noValidate
      >
        <Field error={errors.name?.message}>
          <FieldLabel>Full Name</FieldLabel>
          <FieldControl>
            <Input placeholder="Your full name" {...register("name")} />
          </FieldControl>
          <FieldMessage />
        </Field>

        <Field error={errors.email?.message}>
          <FieldLabel>Email (optional)</FieldLabel>
          <FieldControl>
            <Input
              type="email"
              inputMode="email"
              placeholder="you@example.com"
              {...register("email")}
            />
          </FieldControl>
          <FieldDescription className="text-xs text-gray-500">
            We&apos;ll only use your email if we can&apos;t reach you by phone.
          </FieldDescription>
          <FieldMessage />
        </Field>

        <Field error={errors.phone?.message}>
          <FieldLabel>Phone Number</FieldLabel>
          <Controller
            control={control}
            name="phone"
            render={({ field: { value, onChange, onBlur, ref } }) => {
              const digits = typeof value === "string" ? value : "";
              return (
                <FieldControl>
                  <Input
                    ref={ref}
                    type="tel"
                    inputMode="tel"
                    placeholder="(555) 123-4567"
                    maxLength={14}
                    value={formatPhoneDigits(digits)}
                    onChange={(event) => {
                      const nextDigits = sanitizePhoneDigits(
                        event.target.value
                      );
                      onChange(nextDigits);
                    }}
                    onBlur={(event) => {
                      const nextDigits = sanitizePhoneDigits(
                        event.target.value
                      );
                      onChange(nextDigits);
                      onBlur();
                    }}
                  />
                </FieldControl>
              );
            }}
          />
          <FieldDescription className="text-xs text-gray-500">
            Enter your 10-digit US phone number; we&apos;ll format it for you.
          </FieldDescription>
          <FieldMessage />
        </Field>

        <Field error={errors.message?.message}>
          <FieldLabel>How can we help?</FieldLabel>
          <FieldControl>
            <Textarea
              rows={5}
              placeholder="Share any details or questions..."
              {...register("message")}
            />
          </FieldControl>
          <FieldMessage />
        </Field>

        <Button
          type="submit"
          className="bg-green-700 hover:bg-green-800"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>

        {submissionState ? (
          <p
            className={
              submissionState.type === "success"
                ? "text-sm font-medium text-green-700"
                : "text-sm font-medium text-destructive"
            }
          >
            {submissionState.message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
