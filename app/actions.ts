"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createServerSupabaseClient, getAdminSupabase, VEHICLE_PHOTOS_BUCKET } from "@/lib/supabase/server";

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

async function uploadFiles(files: File[], folder: string) {
  if (!files.length) return [] as string[];
  const supabase = getAdminSupabase();
  const uploaded: string[] = [];
  for (const file of files) {
    const path = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from(VEHICLE_PHOTOS_BUCKET).upload(path, file, { upsert: true });
    if (!error) {
      const { data } = supabase.storage.from(VEHICLE_PHOTOS_BUCKET).getPublicUrl(path);
      uploaded.push(data.publicUrl);
    }
  }
  return uploaded;
}

export async function submitSellForm(formData: FormData) {
  const files = (formData.getAll("photos") as File[]).filter((file) => file.size > 0);
  const photo_urls = await uploadFiles(files, "sell-requests");
  const payload = {
    name: String(formData.get("name") || ""),
    phone: String(formData.get("phone") || ""),
    car_details: String(formData.get("car_details") || ""),
    location: String(formData.get("location") || ""),
    preferred_price_kes: Number(formData.get("preferred_price_kes") || 0),
    photo_urls
  };
  await getAdminSupabase().from("sell_requests").insert(payload);
  redirect("/sell/success");
}

export async function submitLeaseForm(formData: FormData) {
  const payload = {
    name: String(formData.get("name") || ""),
    phone: String(formData.get("phone") || ""),
    category: String(formData.get("category") || ""),
    expected_monthly_range: String(formData.get("expected_monthly_range") || ""),
    car_details: String(formData.get("car_details") || ""),
    location: String(formData.get("location") || "")
  };
  await getAdminSupabase().from("lease_requests").insert(payload);
  redirect("/lease/success");
}

export async function adminSignOut() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function upsertSaleCar(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const files = (formData.getAll("photos") as File[]).filter((file) => file.size > 0);
  const uploadedPhotos = await uploadFiles(files, "sale-cars");
  const photoUrls = String(formData.get("photo_urls") || "").split(",").map((x) => x.trim()).filter(Boolean);

  const payload = {
    title: String(formData.get("title") || ""),
    make: String(formData.get("make") || ""),
    model: String(formData.get("model") || ""),
    year: Number(formData.get("year") || 0),
    engine_cc: Number(formData.get("engine_cc") || 0),
    fuel: String(formData.get("fuel") || ""),
    transmission: String(formData.get("transmission") || ""),
    mileage_km: Number(formData.get("mileage_km") || 0),
    price_kes: Number(formData.get("price_kes") || 0),
    negotiable: String(formData.get("negotiable") || "false") === "true",
    location: String(formData.get("location") || "Nairobi"),
    description: String(formData.get("description") || ""),
    features: String(formData.get("features") || "").split(",").map((x) => x.trim()).filter(Boolean),
    photos: [...photoUrls, ...uploadedPhotos],
    status: String(formData.get("status") || "Available"),
    slug: slugify(String(formData.get("slug") || formData.get("title") || "")),
    is_featured: String(formData.get("is_featured") || "false") === "true"
  };
  const db = getAdminSupabase().from("sale_cars");
  if (id) await db.update(payload).eq("id", id);
  else await db.insert(payload);
  revalidatePath("/cars-for-sale");
  revalidatePath("/");
  redirect("/admin/dashboard");
}

export async function upsertHireCar(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const files = (formData.getAll("photos") as File[]).filter((file) => file.size > 0);
  const uploadedPhotos = await uploadFiles(files, "hire-cars");
  const photoUrls = String(formData.get("photo_urls") || "").split(",").map((x) => x.trim()).filter(Boolean);

  const payload = {
    title: String(formData.get("title") || ""),
    make: String(formData.get("make") || ""),
    model: String(formData.get("model") || ""),
    year: Number(formData.get("year") || 0),
    daily_price_kes: Number(formData.get("daily_price_kes") || 0),
    weekly_price_kes: Number(formData.get("weekly_price_kes") || 0) || null,
    deposit_policy_text: String(formData.get("deposit_policy_text") || ""),
    drive_mode: String(formData.get("drive_mode") || "Self-Drive"),
    location: String(formData.get("location") || "Nairobi"),
    status: String(formData.get("status") || "Available"),
    features: String(formData.get("features") || "").split(",").map((x) => x.trim()).filter(Boolean),
    photos: [...photoUrls, ...uploadedPhotos],
    slug: slugify(String(formData.get("slug") || formData.get("title") || "")),
    is_featured: String(formData.get("is_featured") || "false") === "true"
  };
  const db = getAdminSupabase().from("hire_cars");
  if (id) await db.update(payload).eq("id", id);
  else await db.insert(payload);
  revalidatePath("/hire");
  revalidatePath("/");
  redirect("/admin/dashboard");
}

export async function deleteSaleCar(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (id) await getAdminSupabase().from("sale_cars").delete().eq("id", id);
  revalidatePath("/cars-for-sale");
  redirect("/admin/dashboard");
}

export async function deleteHireCar(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (id) await getAdminSupabase().from("hire_cars").delete().eq("id", id);
  revalidatePath("/hire");
  redirect("/admin/dashboard");
}
