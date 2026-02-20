"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="space-y-4 rounded-xl border p-6"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const form = new FormData(e.currentTarget);
        const email = String(form.get("email") || "");
        const password = String(form.get("password") || "");
        const supabase = createBrowserSupabaseClient();
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) {
          setError(authError.message);
          setLoading(false);
          return;
        }
        router.push("/admin/dashboard");
        router.refresh();
      }}
    >
      <Input name="email" type="email" placeholder="Admin email" required />
      <Input name="password" type="password" placeholder="Password" required />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" disabled={loading}>{loading ? "Signing in..." : "Login"}</Button>
    </form>
  );
}
