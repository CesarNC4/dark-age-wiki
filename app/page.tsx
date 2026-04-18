import { supabase } from "@/lib/supabase";
import DustParticles from "./components/Particles";
import TheaterStage from "./components/TheaterStage";

export default async function Home() {
  const { data: sections } = await supabase
    .from("sections")
    .select("*")
    .order("order_index");

  return (
    <>
      <DustParticles />
      <TheaterStage sections={sections || []} />
    </>
  );
}
