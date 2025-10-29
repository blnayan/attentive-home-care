import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { resendAdapter } from "@payloadcms/email-resend";
import { buildConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";
import collections from "./payload/collections";
import globals from "./payload/globals";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  editor: lexicalEditor(),
  email: resendAdapter({
    defaultFromAddress:
      process.env.RESEND_FROM_ADDRESS || "ahc@attentivehomecare1.com",
    defaultFromName: process.env.RESEND_FROM_NAME || "Attentive Home Care",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
  collections,
  globals,
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  plugins: [
    vercelBlobStorage({
      enabled: process.env.NODE_ENVIRONMENT === "production",
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  sharp,
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
});
