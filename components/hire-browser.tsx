"use client";

import { useMemo, useState } from "react";
import { HireCard } from "@/components/hire-card";
import { Select } from "@/components/ui/select";
import { HireCar } from "@/lib/types";

export function HireBrowser({ cars }: { cars: HireCar[] }) {
  const [location, setLocation] = useState("Nairobi");

  const filtered = useMemo(
    () => cars.filter((car) => car.status === "Available" && car.location === location),
    [cars, location]
  );

  return (
    <div className="space-y-6">
      <div className="max-w-xs">
        <Select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option>Nairobi</option><option>Nakuru</option><option>Kisii</option><option>Kisumu</option>
        </Select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((car) => <HireCard key={car.id} car={car} />)}
      </div>
    </div>
  );
}
