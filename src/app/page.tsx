import qs from "qs"
import { HeroSection } from "@/components/custom/hero-section";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "layout.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"]
            },
            link: {
              populate: true
            }
          }
        }
      }
    }
  },
});

async function getHomePageData(path: string) {
  const baseUrl = "http://localhost:1337";

  const url = new URL(path, baseUrl)
  url.search = homePageQuery

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

  console.dir(homePageData, { depth: null });

  const { title, description, blocks } = homePageData.data;

  return (
    <main className="">
      <HeroSection data={blocks[0]} />
    </main>
  );
}
