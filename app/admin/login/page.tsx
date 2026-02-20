import { AdminLoginForm } from "@/components/admin-login-form";

export default function AdminLoginPage() {
  return (
    <div className="container max-w-md py-20">
      <h1 className="mb-6 text-3xl font-bold">Admin Login</h1>
      <AdminLoginForm />
    </div>
  );
}
