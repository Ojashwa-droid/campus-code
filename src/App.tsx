import { lazy, Suspense } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Header } from "@/components/ui/header";
import FooterInteractive from "@/components/ui/footer-interactive";

const OverviewPage = lazy(() => import("@/app/page"));
const ProductPage = lazy(() => import("@/app/product/page"));
const DashboardPage = lazy(() => import("@/app/dashboard/page"));
const PlaygroundPage = lazy(() => import("@/app/playground/page"));

function NotFoundPage() {
  return (
    <section className="cc-container flex min-h-[55svh] flex-col items-center justify-center gap-4 py-16 text-center">
      <h1 className="cc-heading">404 · This page isn&apos;t in the graph.</h1>
      <p className="cc-copy max-w-md">The address may have changed. Return to the overview to continue exploring CampusCode.</p>
      <Link to="/" className="cc-button cc-button--primary mt-2">Back to overview</Link>
    </section>
  );
}

function AppShell() {
  return (
    <div className="relative isolate flex min-h-screen flex-col">
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
