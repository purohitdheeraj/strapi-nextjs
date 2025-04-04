import { HeroSection } from "@/components/custom/hero-section";
import { FeatureSection } from "@/components/custom/feature-section";
import { getHomePageData } from "@/data/loaders";


export default async function Home() {
  const strapiData = await getHomePageData();
  console.dir(strapiData, { depth: null });
  const { blocks } = strapiData?.data || [];

  return (
    <main>
      {blocks.map(blockRenderer)}
    </main>
  );
}

const blockComponents = {
  "layout.hero-section": HeroSection,
  "layout.features-section": FeatureSection,
};

function blockRenderer(block: any) {
  const Component = blockComponents[block.__component as keyof typeof blockComponents];
  return Component ? <Component key={block.id} data={block} /> : null;
}