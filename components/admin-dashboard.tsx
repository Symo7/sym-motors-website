import { adminSignOut, deleteHireCar, deleteSaleCar, upsertHireCar, upsertSaleCar } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { HireCar, SaleCar } from "@/lib/types";

export function AdminDashboard({ saleCars, hireCars, sellLeads, leaseLeads }: { saleCars: SaleCar[]; hireCars: HireCar[]; sellLeads: any[]; leaseLeads: any[] }) {
  return (
    <div className="space-y-8">
      <form action={adminSignOut}><Button variant="outline">Logout</Button></form>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card><CardHeader><CardTitle>Add / Edit Sale Car</CardTitle></CardHeader><CardContent><form action={upsertSaleCar} className="space-y-2">
          <Input name="id" placeholder="ID (optional for update)" /><Input name="title" placeholder="Title" required />
          <Input name="slug" placeholder="Slug (optional auto-generated)" /><Input name="make" placeholder="Make" required /><Input name="model" placeholder="Model" required />
          <Input name="year" type="number" placeholder="Year" required /><Input name="engine_cc" type="number" placeholder="Engine cc" required />
          <Input name="fuel" placeholder="Fuel" required /><Input name="transmission" placeholder="Transmission" required />
          <Input name="mileage_km" type="number" placeholder="Mileage km" required /><Input name="price_kes" type="number" placeholder="Price KES" required />
          <Select name="negotiable"><option value="false">Not Negotiable</option><option value="true">Negotiable</option></Select>
          <Select name="location"><option>Nairobi</option><option>Nakuru</option><option>Kisii</option><option>Kisumu</option></Select>
          <Select name="is_featured"><option value="false">Not Featured</option><option value="true">Featured</option></Select>
          <Textarea name="description" placeholder="Description" required /><Input name="features" placeholder="Features comma separated" />
          <Input name="photo_urls" placeholder="Photo URLs comma separated" /><Input name="photos" type="file" multiple />
          <Select name="status"><option>Available</option><option>Reserved</option><option>Sold</option></Select>
          <Button type="submit">Save Sale Listing</Button>
        </form></CardContent></Card>

        <Card><CardHeader><CardTitle>Add / Edit Hire Car</CardTitle></CardHeader><CardContent><form action={upsertHireCar} className="space-y-2">
          <Input name="id" placeholder="ID (optional for update)" /><Input name="title" placeholder="Title" required />
          <Input name="slug" placeholder="Slug (optional auto-generated)" /><Input name="make" placeholder="Make" required /><Input name="model" placeholder="Model" required />
          <Input name="year" type="number" placeholder="Year" required /><Input name="daily_price_kes" type="number" placeholder="Daily price" required />
          <Input name="weekly_price_kes" type="number" placeholder="Weekly price optional" /><Input name="deposit_policy_text" placeholder="Deposit policy" required />
          <Select name="drive_mode"><option>Self-Drive</option><option>Chauffeured</option><option>Both</option></Select>
          <Select name="location"><option>Nairobi</option><option>Nakuru</option><option>Kisii</option><option>Kisumu</option></Select>
          <Select name="is_featured"><option value="false">Not Featured</option><option value="true">Featured</option></Select>
          <Select name="status"><option>Available</option><option>Rented</option></Select>
          <Input name="features" placeholder="Features comma separated" /><Input name="photo_urls" placeholder="Photo URLs comma separated" />
          <Input name="photos" type="file" multiple />
          <Button type="submit">Save Hire Listing</Button>
        </form></CardContent></Card>
      </div>

      <Card><CardHeader><CardTitle>Sale Listings</CardTitle></CardHeader><CardContent><div className="space-y-2 text-sm">{saleCars.map((car) => <div key={car.id} className="flex items-center justify-between"><p>{car.title} — {car.status}</p><form action={deleteSaleCar}><input type="hidden" name="id" value={car.id} /><Button size="sm" variant="destructive">Delete</Button></form></div>)}</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Hire Listings</CardTitle></CardHeader><CardContent><div className="space-y-2 text-sm">{hireCars.map((car) => <div key={car.id} className="flex items-center justify-between"><p>{car.title} — {car.status}</p><form action={deleteHireCar}><input type="hidden" name="id" value={car.id} /><Button size="sm" variant="destructive">Delete</Button></form></div>)}</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Sell Form Submissions</CardTitle></CardHeader><CardContent><div className="space-y-2 text-sm">{sellLeads.map((lead) => <p key={lead.id}>{lead.name} — {lead.phone} — {lead.location}</p>)}</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Lease Form Submissions</CardTitle></CardHeader><CardContent><div className="space-y-2 text-sm">{leaseLeads.map((lead) => <p key={lead.id}>{lead.name} — {lead.phone} — {lead.location}</p>)}</div></CardContent></Card>
    </div>
  );
}
