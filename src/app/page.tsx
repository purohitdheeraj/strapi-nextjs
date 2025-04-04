import qs from "qs"
import { HeroSection } from "@/components/custom/hero-section";
import { getStrapiURL } from "@/lib/utils";
import { FeatureSection } from "@/components/custom/feature-section";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "layout.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            link: {
              populate: true,
            },
          },
        },
        "layout.features-section": {
          populate: {
            feature: {
              populate: true,
            },
          },
        },
      },
    },
  },
});

async function getHomePageData(path: string) {
  const baseUrl = getStrapiURL();

  const url = new URL(path, baseUrl)
  url.search = homePageQuery

  console.log(url.href)

  try {
    const res = await fetch(url.href)
    const data = await res.json()
    return data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default async function Home() {
  const homePageData = await getHomePageData("/api/home-page");

  const { title, description, blocks } = homePageData.data;

  console.dir(blocks, { depth: null });

  return (
    <main className="">
      <HeroSection data={blocks[0]} />
      <FeatureSection />
    </main>
  );
}
