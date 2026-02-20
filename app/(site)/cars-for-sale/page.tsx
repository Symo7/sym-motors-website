import { InventoryBrowser } from "@/components/inventory-browser";
import { getSaleCars } from "@/lib/data";

export default async function CarsForSalePage() {
  const cars = await getSaleCars(true);
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold">Cars for Sale</h1>
      <p className="mt-2 text-muted-foreground">Available inventory with search and advanced filters.</p>
      <div className="mt-6"><InventoryBrowser cars={cars} /></div>
    </div>
  );
}
