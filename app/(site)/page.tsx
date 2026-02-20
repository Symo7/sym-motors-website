import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { CarCard } from "@/components/car-card";
import { HireCard } from "@/components/hire-card";
import { Button } from "@/components/ui/button";
import { getFeaturedHireCars, getFeaturedSaleCars } from "@/lib/data";

export default async function HomePage() {
  const [saleCars, hireCars] = await Promise.all([getFeaturedSaleCars(), getFeaturedHireCars()]);

  return (
    <div className="container py-10">
      <AnimatedSection>
        <section className="rounded-2xl border bg-gradient-to-br from-primary/15 to-cyan-300/10 p-8 md:p-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Premium dealership experience</p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-6xl">Discover premium cars for sale and hire at <span className="gradient-text">SYM MOTORS</span></h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">Curated inventory, trusted service, and flexible options across Nairobi, Nakuru, Kisii, and Kisumu.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild><Link href="/cars-for-sale">Browse Inventory</Link></Button>
            <Button variant="outline" asChild><Link href="/hire">Explore Car Hire</Link></Button>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <section className="mt-14">
          <h2 className="text-2xl font-semibold">Featured Cars for Sale</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{saleCars.map((car) => <CarCard key={car.id} car={car} />)}</div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <section className="mt-14">
          <h2 className="text-2xl font-semibold">Featured Hire Fleet</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{hireCars.map((car) => <HireCard key={car.id} car={car} />)}</div>
        </section>
      </AnimatedSection>

      <section className="mt-14 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border p-6"><h3 className="text-xl font-semibold">Testimonials</h3><p className="mt-3 text-sm text-muted-foreground">“SYM MOTORS helped me get a clean unit in under 48 hours. Super professional.” — Brian N.</p></div>
        <div className="rounded-xl border p-6"><h3 className="text-xl font-semibold">FAQ</h3><p className="mt-3 text-sm text-muted-foreground">Q: Can I reserve a car? A: Yes, listings can be marked Reserved with a refundable commitment policy.</p></div>
      </section>
    </div>
  );
}
