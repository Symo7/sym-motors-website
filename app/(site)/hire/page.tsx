import { HireBrowser } from "@/components/hire-browser";
import { getHireCars } from "@/lib/data";

export default async function HirePage() {
  const cars = await getHireCars(true);
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold">Car Hire</h1>
      <p className="mt-2 text-muted-foreground">Pick a location and view currently available fleet options.</p>
      <div className="mt-6"><HireBrowser cars={cars} /></div>
    </div>
  );
}
