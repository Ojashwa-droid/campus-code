import { lazy, Suspense } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Header } from "@/components/ui/header";
import FooterInteractive from "@/components/ui/footer-interactive";
import { StaticDotGrid } from "@/components/ui/static-dot-grid";

const OverviewPage = lazy(() => import("@/app/page"));
const ProductPage = lazy(() => import("@/app/product/page"));
const DashboardPage = lazy(() => import("@/app/dashboard/page"));
const PlaygroundPage = lazy(() => import("@/app/playground/page"));

function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[55vh] max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-mono-accent text-xs uppercase tracking-widest text-zinc-500">404 · Route not found</p>
      <h1 className="text-3xl font-semibold tracking-tight text-white">This page isn&apos;t in the graph.</h1>
      <p className="max-w-md text-sm text-zinc-400">The address may have changed. Return to the overview to continue exploring CampusCode.</p>
      <Link to="/" className="mt-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200">Back to overview</Link>
    </section>
  );
}

function AppShell() {
  return (
    <div className="relative isolate flex min-h-screen flex-col bg-black font-sans text-[13px] leading-relaxed text-[#ededed] antialiased selection:bg-white/20 selection:text-white">
      <StaticDotGrid />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="mx-auto flex min-h-[55vh] max-w-6xl items-center justify-center px-4 text-sm text-zinc-500">Loading CampusCode…</div>}>
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <FooterInteractive />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
