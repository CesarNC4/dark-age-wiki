import AdminDashboard from "./AdminDashboard";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default async function AdminPage() {
  const { data: sections } = await supabaseAdmin
    .from("sections")
    .select("*")
    .order("order_index");

  const { data: articles } = await supabaseAdmin
    .from("articles")
    .select("*, sections(name)")
    .order("created_at", { ascending: false });

  const { data: categories } = await supabaseAdmin
    .from("categories")
    .select("*")
    .order("order_index");

  return (
    <AdminDashboard
      sections={sections || []}
      articles={articles || []}
      categories={categories || []}
    />
  );
}
