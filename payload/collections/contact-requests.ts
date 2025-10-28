import type { CollectionConfig } from "payload";

const contactRequestsCollection: CollectionConfig = {
  slug: "contact-requests",
  labels: {
    singular: "Contact Request",
    plural: "Contact Requests",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "phone", "createdAt"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Full Name",
      required: true,
      maxLength: 100,
    },
    {
      name: "email",
      type: "email",
      label: "Email",
    },
    {
      name: "phone",
      type: "text",
      label: "Phone Number",
      required: true,
    },
    {
      name: "message",
      type: "textarea",
      label: "Message",
      required: true,
      maxLength: 1000,
    },
  ],
};

export default contactRequestsCollection;
