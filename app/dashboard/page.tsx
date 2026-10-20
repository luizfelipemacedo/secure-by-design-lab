import { Suspense } from "react";
import { Activity, LockKeyhole, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NotesForm } from "@/components/notes-form";
import { LogoutButton } from "@/components/logout-button";
import { requireUser } from "@/lib/auth";

export default function DashboardPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6">
      <Suspense fallback={<DashboardSkeleton />}>
        <ProtectedDashboard />
      </Suspense>
    </main>
  );
}

async function ProtectedDashboard() {
  // A01: the server-side authorization check remains mandatory even when Proxy already ran.
  const user = await requireUser();

  return (
    <div className="mx-auto w-full max-w-6xl">
      <header className="mb-8 flex flex-col gap-5 border-b border-cyan-300/20 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300"><LockKeyhole className="size-4" /> Área restrita <span className="text-slate-600">{"//"}</span> SYSTEM SECURED</div>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Painel de segurança</h1>
          <p className="mt-2 text-muted-foreground">Bem-vindo, {user.email}. Este espaço exige uma sessão válida.</p>
        </div>
        <LogoutButton />
      </header>
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <Card>
          <CardHeader><div className="mb-2 flex size-10 items-center justify-center rounded border border-emerald-300/30 bg-emerald-300/10 text-emerald-300 shadow-[0_0_24px_rgb(168_255_120/12%)]"><Activity className="size-5" /></div><CardTitle>Postura atual</CardTitle><CardDescription>Controles ativos neste protótipo.</CardDescription></CardHeader>
          <CardContent className="grid gap-3 text-sm"><StatusLine label="Sessão criptografada" /><StatusLine label="Cookie protegido" /><StatusLine label="Rate limiting ativo" /><StatusLine label="Entrada sanitizada" /></CardContent>
        </Card>
        <Card>
          <CardHeader><div className="mb-2 flex size-10 items-center justify-center rounded border border-cyan-300/30 bg-cyan-300/10 text-cyan-300 shadow-[0_0_24px_rgb(34_211_238/12%)]"><Send className="size-5" /></div><CardTitle>Enviar uma nota</CardTitle><CardDescription>Os dados são validados no cliente e novamente no servidor antes do processamento.</CardDescription></CardHeader>
          <CardContent><NotesForm /></CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatusLine({ label }: { label: string }) {
  return <div className="flex items-center justify-between border-b border-cyan-300/10 py-2 last:border-0"><span>{label}</span><span className="font-mono text-xs font-medium uppercase tracking-wider text-emerald-300">Ativo</span></div>;
}

function DashboardSkeleton() {
  return <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center text-sm text-muted-foreground">Validando sessão...</div>;
}
