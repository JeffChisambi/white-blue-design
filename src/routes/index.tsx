import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Redefining Supply Chains With AI Precision" },
      { name: "description", content: "AI helps you move faster and smarter, cutting costs and increasing customer satisfaction at every step of your supply chain." },
    ],
  }),
  component: Index,
});

function Index() {
  const blue = "#52CDEF";
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* subtle grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,10,10,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Nav */}
      <header className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <Logo className="w-9 h-9" />
            <span className="text-lg font-semibold tracking-tight">Nexora</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#services" className="hover:text-muted-foreground transition">Services</a>
            <a href="#ai-lab" className="hover:text-muted-foreground transition">AI lab</a>
            <a href="#assessment" className="hover:text-muted-foreground transition">AI assessment</a>
            <a href="#contact" className="hover:text-muted-foreground transition">Contact</a>
          </nav>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium text-white transition hover:opacity-90"
            style={{ backgroundColor: "#52CDEF" }}
          >
            Get Started
          </a>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-20 text-center">
        <div className="inline-block px-5 py-2 rounded-full border border-border bg-card/70 text-sm backdrop-blur">
          Stay Ahead Of The Competition
        </div>

        <h1 className="mt-10 text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
          <span className="text-foreground/30">Redefining Supply Chains</span>
          <br />
          With AI Precision
        </h1>

        <p className="mt-7 mx-auto max-w-xl text-muted-foreground text-base leading-relaxed">
          AI helps you move faster and smarter, cutting costs and increasing
          customer satisfaction at every step of your supply chain.
        </p>

        {/* Circuit lines */}
        <div className="relative mt-16">
          <svg
            className="absolute -top-4 left-0 w-[30%] h-24 hidden md:block"
            viewBox="0 0 400 100"
            fill="none"
          >
            <path d="M0 50 L100 50 L130 20 L260 20 L290 60 L400 60" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
            <circle cx="130" cy="20" r="4" stroke="currentColor" strokeOpacity="0.5" fill="none" />
            <circle cx="260" cy="20" r="4" stroke="currentColor" strokeOpacity="0.5" fill="none" />
            <circle cx="0" cy="90" r="4" stroke="currentColor" strokeOpacity="0.5" fill="none" />
          </svg>
          <svg
            className="absolute -top-4 right-0 w-[30%] h-24 hidden md:block"
            viewBox="0 0 400 100"
            fill="none"
          >
            <path d="M400 50 L300 50 L270 20 L140 20 L110 60 L0 60" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
            <circle cx="270" cy="20" r="4" stroke="currentColor" strokeOpacity="0.5" fill="none" />
            <circle cx="140" cy="20" r="4" stroke="currentColor" strokeOpacity="0.5" fill="none" />
            <circle cx="400" cy="90" r="4" stroke="currentColor" strokeOpacity="0.5" fill="none" />
          </svg>

          {/* Stats grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-4 mt-12 p-3 rounded-3xl border border-border bg-card/50 backdrop-blur">
            {/* Left col */}
            <div className="flex flex-col gap-4">
              <StatCard label="Data Points Processed" value="50B+" />
              <StatCard label="Optimization Algorithms Developed" value="55+" />
            </div>

            {/* Chart center */}
            <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 relative overflow-hidden min-h-[260px]">
              <ChartSVG blue={blue} />
              <div
                className="absolute top-6 right-10 px-3 py-1 rounded-full text-xs border"
                style={{ borderColor: blue, color: blue, background: "rgba(82,205,239,0.08)" }}
              >
                Efficiency <span className="font-semibold">+103%</span>
              </div>
              <div
                className="absolute bottom-16 left-1/3 px-3 py-1 rounded-full text-xs border"
                style={{ borderColor: blue, color: blue, background: "rgba(82,205,239,0.08)" }}
              >
                Cost Reduction <span className="font-semibold">-34%</span>
              </div>
            </div>

            {/* Right col */}
            <div className="flex flex-col gap-4">
              <StatCard label="AI Models Deployed" value="70+" />
              <StatCard label="Predictive Models Developed" value="40+" />
            </div>
          </div>
        </div>
      </main>

      <div className="h-32" />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 rounded-2xl border border-border bg-card p-6 flex flex-col items-center justify-center text-center min-h-[120px]">
      <div className="text-xs text-muted-foreground mb-3">{label}</div>
      <div className="text-3xl font-bold tracking-tight">{value}</div>
    </div>
  );
}

function ChartSVG({ blue }: { blue: string }) {
  return (
    <svg viewBox="0 0 500 220" className="w-full h-full absolute inset-0 p-6">
      <defs>
        <linearGradient id="up" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={blue} stopOpacity="0.35" />
          <stop offset="100%" stopColor={blue} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* dots bg */}
      {Array.from({ length: 40 }).map((_, i) => (
        <circle key={i} cx={(i * 13) % 500} cy={(i * 29) % 220} r="1" fill={blue} opacity="0.25" />
      ))}
      {/* upward line */}
      <path
        d="M20 170 L80 150 L130 140 L180 120 L230 110 L290 80 L350 70 L420 40 L470 30"
        fill="none"
        stroke={blue}
        strokeWidth="2"
      />
      <path
        d="M20 170 L80 150 L130 140 L180 120 L230 110 L290 80 L350 70 L420 40 L470 30 L470 210 L20 210 Z"
        fill="url(#up)"
      />
      {/* downward dashed */}
      <path
        d="M20 130 L80 140 L130 150 L200 160 L260 170 L320 165 L380 175 L440 180 L470 185"
        fill="none"
        stroke={blue}
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />
      <circle cx="470" cy="30" r="6" fill="none" stroke={blue} strokeWidth="2" />
      <circle cx="470" cy="185" r="5" fill="none" stroke={blue} strokeOpacity="0.7" strokeWidth="1.5" />
      <circle cx="290" cy="80" r="4" fill={blue} />
      <circle cx="290" cy="80" r="10" fill={blue} opacity="0.2" />
      <circle cx="200" cy="160" r="4" fill={blue} />
      <circle cx="200" cy="160" r="10" fill={blue} opacity="0.2" />
    </svg>
  );
}
