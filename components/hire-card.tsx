import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { HireCar } from "@/lib/types";

export function HireCard({ car }: { car: HireCar }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image src={car.photos?.[0] || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200"} alt={car.title} fill className="object-cover" />
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{car.title}</h3>
          <Badge variant={car.status === "Available" ? "success" : "warning"}>{car.status}</Badge>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">{car.drive_mode}</Badge>
          <Badge variant="secondary">{car.location}</Badge>
        </div>
        <p className="font-semibold">KES {car.daily_price_kes.toLocaleString()}/day</p>
        <Link href={`/hire/${car.slug}`} className="text-sm font-medium text-primary">View rental details →</Link>
      </div>
    </Card>
  );
}
