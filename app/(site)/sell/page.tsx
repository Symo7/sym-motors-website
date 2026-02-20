import Link from "next/link";
import { submitSellForm } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function SellPage() {
  return (
    <div className="container max-w-3xl py-10">
      <h1 className="text-3xl font-bold">Sell Your Car</h1>
      <form action={submitSellForm} className="mt-6 space-y-4 rounded-xl border p-6">
        <div><Label>Name</Label><Input name="name" required /></div>
        <div><Label>Phone</Label><Input name="phone" required /></div>
        <div><Label>Car details</Label><Textarea name="car_details" required /></div>
        <div><Label>Location</Label><Select name="location"><option>Nairobi</option><option>Nakuru</option><option>Kisii</option><option>Kisumu</option></Select></div>
        <div><Label>Preferred selling price (KES)</Label><Input name="preferred_price_kes" type="number" /></div>
        <div><Label>Photos upload (optional, MVP placeholder)</Label><Input name="photos" type="file" multiple /></div>
        <Button type="submit">Submit Listing Request</Button>
      </form>
      <p className="mt-4 text-sm text-muted-foreground">Need help? <Link href="https://wa.me/254115182398" target="_blank" className="text-primary">Chat on WhatsApp</Link>.</p>
    </div>
  );
}
