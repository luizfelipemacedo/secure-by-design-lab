import Link from "next/link";
import { Activity, ArrowRight, ShieldCheck, Terminal } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050507] px-5 py-6 text-foreground sm:px-8 sm:py-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgb(34_211_238/4%)_1px,transparent_1px),linear-gradient(90deg,rgb(34_211_238/4%)_1px,transparent_1px)] bg-size-[42px_42px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgb(34_211_238/13%),transparent_30%),radial-gradient(circle_at_88%_78%,rgb(240_82_180/10%),transparent_28%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col justify-between sm:min-h-[calc(100vh-4rem)]">
        <header className="flex items-center justify-between border-b border-cyan-300/15 pb-5">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300 sm:text-sm"><ShieldCheck className="size-5" /> Secure by Design</div>
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:gap-6"><span className="flex items-center gap-2 text-emerald-300"><span className="size-1.5 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_10px_#a8ff78]" /> SYSTEM ONLINE</span><Link className="text-cyan-300 underline underline-offset-4 transition-colors hover:text-white" href="/login">Entrar</Link></div>
        </header>

        <section className="grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:py-24">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-fuchsia-300">Laboratório de aplicações seguras // 01</p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-7xl lg:text-8xl">Segurança como ponto de partida.</h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">Explore um fluxo de autenticação construído com acesso mínimo, sessões curtas e validação em todas as fronteiras.</p>
            <Link className={`${buttonVariants({ size: "lg" })} mt-8`} href="/login">Acessar laboratório <ArrowRight /></Link>
          </div>

          <div className="border border-cyan-300/20 bg-[#080a0e]/85 p-5 font-mono shadow-[0_0_80px_rgb(34_211_238/10%)] backdrop-blur-xl sm:p-6">
            <div className="mb-6 flex items-center justify-between border-b border-cyan-300/15 pb-4 text-[10px] uppercase tracking-[0.2em] text-slate-500"><span className="flex items-center gap-2 text-cyan-300"><Terminal className="size-4" /> telemetry://access</span><Activity className="size-4 text-fuchsia-300" /></div>
            <div className="space-y-4 text-xs leading-5">
              <div className="flex justify-between gap-4 text-slate-500"><span>SESSION_POLICY</span><span className="text-emerald-300">SHORT_LIVED</span></div>
              <div className="flex justify-between gap-4 text-slate-500"><span>ACCESS_SCOPE</span><span className="text-cyan-300">MINIMUM_REQUIRED</span></div>
              <div className="flex justify-between gap-4 text-slate-500"><span>BOUNDARY_CHECK</span><span className="text-fuchsia-300">ENFORCED</span></div>
              <div className="mt-6 border-t border-cyan-300/15 pt-4 text-slate-600"><span className="text-emerald-300">$</span> initialize_secure_flow<span className="ml-1 animate-pulse text-cyan-300">_</span></div>
            </div>
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-cyan-300/15 pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500"><span>OWASP TOP 10:2025</span><span className="text-fuchsia-300">A01 · A05 · A07</span><Link className="hover:underline hover:underline-offset-4 transition-colors hover:text-white" href="https://github.com/luizfelipemacedo" target="_blank" rel="noopener noreferrer">DEVELOPED BY LUIZFELIPEMACEDO</Link></footer>
      </div>
    </main>
  );
}
