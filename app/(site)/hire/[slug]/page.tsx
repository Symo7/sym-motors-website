import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getHireCarBySlug } from "@/lib/data";

export default async function HireDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const car = await getHireCarBySlug(slug);
  if (!car) return notFound();

  return (
    <div className="container py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative h-80 overflow-hidden rounded-xl border"><Image src={car.photos?.[0]} alt={car.title} fill className="object-cover" /></div>
        <div>
          <div className="flex gap-2"><Badge variant={car.status === "Available" ? "success" : "warning"}>{car.status}</Badge><Badge variant="secondary">{car.drive_mode}</Badge></div>
          <h1 className="mt-3 text-3xl font-bold">{car.title}</h1>
          <p className="mt-2 text-muted-foreground">{car.year} • {car.location}</p>
          <p className="mt-4 text-xl font-semibold">KES {car.daily_price_kes.toLocaleString()}/day</p>
          {car.weekly_price_kes && <p className="text-sm text-muted-foreground">KES {car.weekly_price_kes.toLocaleString()}/week</p>}
          <p className="mt-4 text-sm">Deposit policy: {car.deposit_policy_text}</p>
        </div>
      </div>
    </div>
  );
}
