"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SaleCar } from "@/lib/types";

export function CarCard({ car }: { car: SaleCar }) {
  const badgeVariant = car.status === "Available" ? "success" : car.status === "Reserved" ? "warning" : "sold";
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden">
        <div className="relative h-48">
          <Image src={car.photos?.[0] || "https://images.unsplash.com/photo-1493238792000-8113da705763?w=1200"} alt={car.title} fill className="object-cover" />
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold">{car.title}</h3>
            <Badge variant={badgeVariant}>{car.status}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{car.year} • {car.engine_cc}cc • {car.transmission}</p>
          <p className="text-lg font-semibold">KES {car.price_kes.toLocaleString()}</p>
          <Link href={`/cars-for-sale/${car.slug}`} className="text-sm font-medium text-primary">View details →</Link>
        </div>
      </Card>
    </motion.div>
  );
}
