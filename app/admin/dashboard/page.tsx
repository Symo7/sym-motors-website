import { AdminDashboard } from "@/components/admin-dashboard";
import { requireAdmin } from "@/lib/auth";
import { getAdminSupabase } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const db = getAdminSupabase();
  const [{ data: saleCars }, { data: hireCars }, { data: sellLeads }, { data: leaseLeads }] = await Promise.all([
    db.from("sale_cars").select("*").order("created_at", { ascending: false }),
    db.from("hire_cars").select("*").order("created_at", { ascending: false }),
    db.from("sell_requests").select("*").order("created_at", { ascending: false }),
    db.from("lease_requests").select("*").order("created_at", { ascending: false })
  ]);

  return (
    <div className="container py-10">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
      <AdminDashboard saleCars={(saleCars as any[]) || []} hireCars={(hireCars as any[]) || []} sellLeads={sellLeads || []} leaseLeads={leaseLeads || []} />
    </div>
  );
}
