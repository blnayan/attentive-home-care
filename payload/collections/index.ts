import type { CollectionConfig } from "payload";
import contactRequestsCollection from "./contact-requests";
import mediaCollection from "./media";

const collections: CollectionConfig[] = [mediaCollection, contactRequestsCollection];

export default collections;
