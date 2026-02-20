import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSaleCarBySlug } from "@/lib/data";

export default async function CarDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const car = await getSaleCarBySlug(slug);
  if (!car) return notFound();

  const listingLink = `https://symmotors.co.ke/cars-for-sale/${car.slug}`;
  const message = `Hi SYM MOTORS, I'm interested in ${car.title} (KES ${car.price_kes.toLocaleString()}) in ${car.location}. ${listingLink}`;

  return (
    <div className="container py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          {car.photos.map((photo, index) => (
            <div key={index} className="relative h-64 overflow-hidden rounded-xl border"><Image src={photo} alt={`${car.title}-${index}`} fill className="object-cover" /></div>
          ))}
        </div>
        <div>
          <Badge variant={car.status === "Available" ? "success" : car.status === "Reserved" ? "warning" : "sold"}>{car.status}</Badge>
          <h1 className="mt-3 text-3xl font-bold">{car.title}</h1>
          <p className="mt-2 text-muted-foreground">{car.year} • {car.engine_cc}cc • {car.transmission} • {car.fuel} • {car.mileage_km.toLocaleString()} km</p>
          <p className="mt-5 text-2xl font-semibold">KES {car.price_kes.toLocaleString()} {car.negotiable ? "(Negotiable)" : ""}</p>
          <p className="mt-4 text-sm text-muted-foreground">{car.description}</p>
          <div className="mt-6 flex gap-3">
            <Button asChild><a href={`https://wa.me/254115182398?text=${encodeURIComponent(message)}`} target="_blank">WhatsApp</a></Button>
            <Button variant="outline" asChild><a href="tel:+254115182398">Call 0115 182 398</a></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
