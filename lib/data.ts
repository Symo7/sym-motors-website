import { createServerSupabaseClient } from "@/lib/supabase/server";
import { HireCar, SaleCar } from "@/lib/types";

export async function getSaleCars(availableOnly = true): Promise<SaleCar[]> {
  const supabase = await createServerSupabaseClient();
  let query = supabase.from("sale_cars").select("*").order("created_at", { ascending: false });
  if (availableOnly) query = query.eq("status", "Available");
  const { data } = await query;
  return (data ?? []) as SaleCar[];
}

export async function getFeaturedSaleCars() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("sale_cars")
    .select("*")
    .eq("status", "Available")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(3);
  return (data ?? []) as SaleCar[];
}

export async function getSaleCarBySlug(slug: string) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("sale_cars").select("*").eq("slug", slug).maybeSingle();
  return data as SaleCar | null;
}

export async function getHireCars(availableOnly = true): Promise<HireCar[]> {
  const supabase = await createServerSupabaseClient();
  let query = supabase.from("hire_cars").select("*").order("created_at", { ascending: false });
  if (availableOnly) query = query.eq("status", "Available");
  const { data } = await query;
  return (data ?? []) as HireCar[];
}

export async function getFeaturedHireCars() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("hire_cars")
    .select("*")
    .eq("status", "Available")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(3);
  return (data ?? []) as HireCar[];
}

export async function getHireCarBySlug(slug: string) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("hire_cars").select("*").eq("slug", slug).maybeSingle();
  return data as HireCar | null;
}
