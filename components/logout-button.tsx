"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function logout() {
    if (pending) return;

    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });

      if (!response.ok) {
        throw new Error("Logout request failed");
      }

      router.replace("/login");
      router.refresh();
    } catch {
      setError("Não foi possível sair. Tente novamente.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <Button type="button" variant="outline" onClick={logout} disabled={pending}>
        {pending ? "Saindo..." : "Sair"}
      </Button>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    </>
  );
}
