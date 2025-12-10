import { getFruitsList } from "@/components/fruits";
import FruitsWrapperClient from "@/components/fruits/fruits-wrapper.client";

export default async function Page() {
  const [fruitsListResponse] = await Promise.all([getFruitsList({})]);
  console.log("fruitsListResponse", fruitsListResponse); // NOTE: Checked that the api returns data
  return <FruitsWrapperClient initialFruits={fruitsListResponse} />;
}
