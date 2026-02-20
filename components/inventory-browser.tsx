"use client";

import { useMemo, useState } from "react";
import { CarCard } from "@/components/car-card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SaleCar } from "@/lib/types";

export function InventoryBrowser({ cars }: { cars: SaleCar[] }) {
  const [search, setSearch] = useState("");
  const [make, setMake] = useState("all");
  const [model, setModel] = useState("all");
  const [fuel, setFuel] = useState("all");
  const [transmission, setTransmission] = useState("all");
  const [location, setLocation] = useState("all");
  const [minYear, setMinYear] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filtered = useMemo(() => cars.filter((car) => {
    const q = search.toLowerCase();
    return (!q || `${car.title} ${car.make} ${car.model}`.toLowerCase().includes(q))
      && (make === "all" || car.make === make)
      && (model === "all" || car.model === model)
      && (fuel === "all" || car.fuel === fuel)
      && (transmission === "all" || car.transmission === transmission)
      && (location === "all" || car.location === location)
      && (!minYear || car.year >= Number(minYear))
      && (!maxPrice || car.price_kes <= Number(maxPrice));
  }), [cars, search, make, model, fuel, transmission, location, minYear, maxPrice]);

  const makes = [...new Set(cars.map((car) => car.make))];
  const models = [...new Set(cars.map((car) => car.model))];

  return (
    <div className="space-y-6">
      <div className="grid gap-3 rounded-xl border p-4 md:grid-cols-4">
        <Input placeholder="Search make/model/title" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Select value={make} onChange={(e) => setMake(e.target.value)}><option value="all">All makes</option>{makes.map((m) => <option key={m}>{m}</option>)}</Select>
        <Select value={model} onChange={(e) => setModel(e.target.value)}><option value="all">All models</option>{models.map((m) => <option key={m}>{m}</option>)}</Select>
        <Select value={fuel} onChange={(e) => setFuel(e.target.value)}><option value="all">All fuel</option><option>Petrol</option><option>Diesel</option><option>Hybrid</option><option>Electric</option></Select>
        <Select value={transmission} onChange={(e) => setTransmission(e.target.value)}><option value="all">All transmission</option><option>Automatic</option><option>Manual</option></Select>
        <Select value={location} onChange={(e) => setLocation(e.target.value)}><option value="all">All locations</option><option>Nairobi</option><option>Nakuru</option><option>Kisii</option><option>Kisumu</option></Select>
        <Input type="number" placeholder="Min year" value={minYear} onChange={(e) => setMinYear(e.target.value)} />
        <Input type="number" placeholder="Max price (KES)" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((car) => <CarCard key={car.id} car={car} />)}
      </div>
    </div>
  );
}
