import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-10 text-foreground sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden border border-cyan-300/20 bg-black/30 shadow-[0_0_80px_rgb(34_211_238/10%)] backdrop-blur-xl md:grid-cols-[1fr_0.9fr]">
          <section className="relative hidden flex-col justify-between border-r border-cyan-300/15 bg-[#080a0e]/85 p-10 md:flex">
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-cyan-300"><ShieldCheck className="size-5" /> SECURE BY DESIGN</div>
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-cyan-300/60">Laboratório de segurança</p>
              <h1 className="max-w-md text-4xl font-semibold leading-tight text-white">Construa confiança antes de escrever código.</h1>
              <p className="mt-5 max-w-sm text-slate-400">Um protótipo didático com acesso mínimo, sessões curtas e validação em todas as fronteiras.</p>
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500"><span>OWASP Top 10:2025</span><span className="text-fuchsia-300">A01 · A05 · A07</span></div>
          </section>
          <section className="flex items-center bg-[#0a0a0c]/70 p-5 sm:p-10">
            <Card className="w-full border-0 shadow-none">
              <CardHeader className="px-0">
                <div className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300"><span className="size-1.5 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_10px_#a8ff78]" /> SYSTEM SECURED</div>
                <CardTitle className="text-2xl text-white">Entrar no laboratório</CardTitle>
                <CardDescription className="text-slate-400">Use a credencial demo configurada no ambiente.</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <LoginForm />
                <p className="mt-6 text-center font-mono text-xs text-muted-foreground"><Link className="text-cyan-300 underline underline-offset-4 hover:text-white" href="/">Voltar para a página inicial</Link></p>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
}
