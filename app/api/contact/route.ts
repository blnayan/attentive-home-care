import payloadConfig from "@payload-config";
import { contactSubmissionSchema } from "@/lib/validation/contact";
import { NextResponse, type NextRequest } from "next/server";
import { getPayload } from "payload";

export async function POST(request: NextRequest) {
  let payloadBody: unknown;

  try {
    payloadBody = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 }
    );
  }

  const parsedBody = contactSubmissionSchema.safeParse(payloadBody);

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        message: "Please correct the highlighted fields and try again.",
        errors: parsedBody.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { name, email, phone, message, recaptchaToken } = parsedBody.data;

  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;

  if (!recaptchaSecret) {
    console.error("reCAPTCHA secret key is not configured on the server.");
    return NextResponse.json(
      {
        message:
          "Form verification is not available right now. Please try again later.",
      },
      { status: 500 }
    );
  }

  let verificationResult: {
    success: boolean;
    score?: number;
    action?: string;
    "error-codes"?: string[];
  };

  try {
    const verificationResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: recaptchaSecret,
          response: recaptchaToken,
        }),
      }
    );

    verificationResult = await verificationResponse.json();
  } catch (error) {
    console.error("reCAPTCHA verification failed to complete.", error);
    return NextResponse.json(
      {
        message:
          "We couldn't verify your submission. Please refresh the page and try again.",
      },
      { status: 400 }
    );
  }

  const scoreThreshold = Number(process.env.RECAPTCHA_SCORE_THRESHOLD ?? "0.5");

  if (
    !verificationResult?.success ||
    (verificationResult.action &&
      verificationResult.action !== "contact_form") ||
    (typeof verificationResult.score === "number" &&
      verificationResult.score < scoreThreshold)
  ) {
    console.warn("reCAPTCHA verification rejected submission.", {
      score: verificationResult?.score,
      action: verificationResult?.action,
      errors: verificationResult?.["error-codes"],
    });

    return NextResponse.json(
      {
        message:
          "Your submission could not be verified. Please refresh the page and try again.",
      },
      { status: 400 }
    );
  }

  try {
    const payload = await getPayload({ config: payloadConfig });

    await payload.create({
      collection: "contact-requests",
      overrideAccess: true,
      data: {
        name,
        email,
        phone,
        message,
      },
    });

    const detailsRows = [
      { label: "Name", value: name },
      { label: "Email", value: email || "Not provided" },
      { label: "Phone", value: phone },
      { label: "Message", value: message },
    ]
      .map(
        (entry) => `
          <tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #064e3b;">${entry.label}</td>
            <td style="padding: 8px 12px; color: #111827; border-left: 1px solid #e5e7eb;">${entry.value}</td>
          </tr>
        `
      )
      .join("");

    const emailWrapper = (heading: string, body: string) => `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f9fafb; padding: 32px;">
        <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px -12px rgba(15, 118, 110, 0.35);">
          <div style="background: linear-gradient(135deg, #047857 0%, #0f766e 100%); padding: 24px;">
            <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">${heading}</h1>
          </div>
          <div style="padding: 24px 28px; color: #1f2937; line-height: 1.6;">
            ${body}
            <table style="width: 100%; margin-top: 20px; border-collapse: collapse; background: #f9fafb; border-radius: 10px; overflow: hidden;">
              <tbody>${detailsRows}</tbody>
            </table>
          </div>
          <div style="padding: 18px 28px; font-size: 12px; color: #6b7280; background: #f3f4f6;">
            This message was generated from a contact form submission on ${
              process.env.BUSINESS_NAME ?? "Attentive Home Care"
            }.
          </div>
        </div>
      </div>
    `;

    const adminEmail = process.env.SPONSOR_EMAIL;

    if (adminEmail) {
      await payload.sendEmail({
        to: adminEmail,
        subject: "New Contact Request Received",
        html: emailWrapper(
          "New contact request just arrived",
          `<p style="margin: 0;">Hi there,</p>
           <p style="margin-top: 8px;">A new inquiry has been submitted through the website. Here are the details:</p>`
        ),
        text: `New contact request submitted.

Name: ${name}
Email: ${email || "Not provided"}
Phone: ${phone}
Message:
${message}`,
      });
    }

    if (email) {
      const businessName = process.env.BUSINESS_NAME ?? "Attentive Home Care";
      await payload.sendEmail({
        to: email,
        subject: `We received your message | ${businessName}`,
        html: emailWrapper(
          "Thank you for reaching out!",
          `<p style="margin: 0;">Hi ${name.split(" ")[0] || "there"},</p>
           <p style="margin-top: 8px;">Thanks for contacting <strong>${businessName}</strong>. A member of our team will be in touch shortly.</p>
           <p style="margin-top: 8px;">For your records, here’s a copy of the information you shared with us:</p>`
        ),
        text: `Thank you for contacting ${businessName}.

We received the following information:

Name: ${name}
Email: ${email}
Phone: ${phone}
Message:
${message}

We'll be in touch shortly!`,
      });
    }
  } catch (error) {
    console.error("Failed to store contact request in Payload CMS.", error);
    return NextResponse.json(
      {
        message:
          "We couldn't submit your request right now. Please try again later.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Thank you! We'll be in touch soon." },
    { status: 201 }
  );
}
