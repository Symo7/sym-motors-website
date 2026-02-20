import { MetadataRoute } from "next";
import { getHireCars, getSaleCars } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://symmotors.co.ke";
  const [saleCars, hireCars] = await Promise.all([getSaleCars(false), getHireCars(false)]);

  const staticRoutes = ["", "/cars-for-sale", "/hire", "/sell", "/lease", "/about-contact", "/admin/login"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8
  }));

  const saleRoutes = saleCars.map((car) => ({
    url: `${base}/cars-for-sale/${car.slug}`,
    changeFrequency: "daily" as const,
    priority: 0.7
  }));

  const hireRoutes = hireCars.map((car) => ({
    url: `${base}/hire/${car.slug}`,
    changeFrequency: "daily" as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...saleRoutes, ...hireRoutes];
}
