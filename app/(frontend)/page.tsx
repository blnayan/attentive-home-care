import HomePageClient from "@/components/home/home-page-client";
import type { HomePageData } from "@/types/home-page";
import payloadConfig from "@payload-config";
import { getPayload } from "payload";

export default async function HomePage() {
  let data: HomePageData = {} as HomePageData;

  try {
    const payload = await getPayload({ config: payloadConfig });
    data = (await payload.findGlobal({
      slug: "home-page",
      depth: 2,
    })) as HomePageData;
  } catch (error) {
    console.error("Failed to load home page content from Payload CMS.", error);
  }

  return <HomePageClient data={data} />;
}
