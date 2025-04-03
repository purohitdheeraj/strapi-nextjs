
import { Button } from "@/components/ui/button";


async function getHomePageData(url: string) {
  const baseUrl = "http://localhost:1337";
  try {
    const res = await fetch(baseUrl + url)
    const data = await res.json()
    return data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default async function Home() {
  const homePageData = await getHomePageData("/api/home-page");

  const { title, description } = homePageData.data;


  return (
    <div className="mx-auto container p-4">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-xl mt-4">{description}</p>
    </div>
  );
}
