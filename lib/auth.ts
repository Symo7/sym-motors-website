import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getCurrentUserRole() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return { user: null, role: null as string | null };

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  return { user, role: profile?.role ?? null };
}

export async function requireAdmin() {
  const { user, role } = await getCurrentUserRole();
  if (!user || role !== "admin") {
    redirect("/admin/login");
  }
  return user;
}
