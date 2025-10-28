import payloadConfig from "@payload-config";
import { contactFormSchema } from "@/lib/validation/contact";
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

  const parsedBody = contactFormSchema.safeParse(payloadBody);

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        message: "Please correct the highlighted fields and try again.",
        errors: parsedBody.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { name, email, phone, message } = parsedBody.data;

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
