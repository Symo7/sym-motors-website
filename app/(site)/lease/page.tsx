import { submitLeaseForm } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function LeasePage() {
  return (
    <div className="container max-w-3xl py-10">
      <h1 className="text-3xl font-bold">Lease Your Car to SYM Motors</h1>
      <form action={submitLeaseForm} className="mt-6 space-y-4 rounded-xl border p-6">
        <div><Label>Name</Label><Input name="name" required /></div>
        <div><Label>Phone</Label><Input name="phone" required /></div>
        <div><Label>Car type/category</Label><Input name="category" required /></div>
        <div><Label>Expected monthly range</Label><Input name="expected_monthly_range" required /></div>
        <div><Label>Car details</Label><Textarea name="car_details" required /></div>
        <div><Label>Location</Label><Select name="location"><option>Nairobi</option><option>Nakuru</option><option>Kisii</option><option>Kisumu</option></Select></div>
        <Button type="submit">Submit Lease Request</Button>
      </form>
    </div>
  );
}
