import { join } from "path";
import qs from "qs"

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

  const { title, description } = homePageData.data;

  return (
    <div className="mx-auto container p-4">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-xl mt-4">{description}</p>
    </div>
  );
}
