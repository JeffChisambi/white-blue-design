import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import ogulaLogo from "@/assets/ogulalogo.svg";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { Menu, X } from "lucide-react";


const easeOut = [0.22, 1, 0.36, 1] as const;

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
};

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}

function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OgulaDesk — Smart Client & Hosting Management Platform" },
      {
        name: "description",
        content:
          "OgulaDesk helps businesses organize client records, track hosting subscriptions, manage contracts, generate invoices and receipts, and automate renewal reminders—all from one dashboard.",
      },
    ],
  }),
  component: Index,
});

const blue = "#52CDEF";

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHeaderHidden(y > 80 && y > lastScrollY.current);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How it works" },

    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative">

      {/* premium ambient gradients — hero only */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[900px] overflow-hidden">
        <div
          className="absolute left-1/2 top-[-280px] h-[760px] w-[1100px] -translate-x-1/2 rounded-full blur-2xl opacity-60"
          style={{
            background:
              "radial-gradient(closest-side, rgba(82,205,239,0.22), rgba(82,205,239,0.06) 55%, transparent 75%)",
          }}
        />
        <div
          className="absolute left-[8%] top-[180px] h-[380px] w-[380px] rounded-full blur-2xl opacity-50"
          style={{
            background:
              "radial-gradient(closest-side, rgba(82,205,239,0.18), transparent 70%)",
          }}
        />
        <div
          className="absolute right-[6%] top-[120px] h-[400px] w-[400px] rounded-full blur-2xl opacity-40"
          style={{
            background:
              "radial-gradient(closest-side, rgba(120,170,255,0.16), transparent 70%)",
          }}
        />
      </div>

      {/* faded dot grid — hero section only */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[900px]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(10,10,10,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 85%)",
        }}
      />

      {/* soft top vignette to fade dots into background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />

      {/* Nav */}
      <header className={`sticky top-0 z-20 w-full transition-all duration-300 ${headerHidden ? "-translate-y-full" : "translate-y-0"} ${scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : ""}`}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src={ogulaLogo} alt="OgulaDesk" className="h-8 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#features" className="hover:text-muted-foreground transition">Features</a>
            <a href="#how-it-works" className="hover:text-muted-foreground transition">How it works</a>

            <a href="#contact" className="hover:text-muted-foreground transition">Contact</a>
          </nav>
          <Link
            to="/signup"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium text-white transition hover:opacity-90"
            style={{ backgroundColor: blue }}
          >
            Get Started
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card/70 backdrop-blur transition hover:bg-card"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: easeOut }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              key="sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="fixed top-0 right-0 z-50 h-full w-[82%] max-w-sm md:hidden bg-card border-l border-border shadow-2xl flex flex-col"
            >
              {/* ambient gradient inside sidebar */}
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(circle at 100% 0%, rgba(82,205,239,0.18), transparent 60%)",
                }}
              />
              <div className="relative flex items-center justify-between px-6 py-5 border-b border-border">
                <img src={ogulaLogo} alt="OgulaDesk" className="h-8 w-auto" />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background/70 transition hover:bg-background"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <motion.nav
                className="relative flex-1 px-6 py-8 flex flex-col gap-1"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
                }}
              >
                {navLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    variants={{
                      hidden: { opacity: 0, x: 24 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeOut } },
                    }}
                    className="group flex items-center justify-between py-4 text-lg font-medium border-b border-border/60 transition hover:text-foreground"
                  >
                    <span>{link.label}</span>
                    <span
                      className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                      style={{ backgroundColor: blue, boxShadow: `0 0 10px ${blue}` }}
                    />
                  </motion.a>
                ))}

                <motion.a
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut, delay: 0.1 } },
                  }}
                  className="mt-8 inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-medium text-white transition hover:opacity-90"
                  style={{ backgroundColor: blue, boxShadow: `0 10px 30px -10px ${blue}` }}
                >
                  Get Started
                </motion.a>
              </motion.nav>

              <div className="relative px-6 py-5 border-t border-border text-xs text-muted-foreground">
                © 2026 OgulaDesk
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>


      {/* Hero */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-20 text-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0 } },
          }}
        >
          <motion.div variants={revealVariants} className="inline-block px-5 py-2 rounded-full border border-border bg-card text-sm shadow-sm">
            <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle" style={{ backgroundColor: blue, boxShadow: `0 0 12px ${blue}` }} />
            Smart Client & Hosting Management Platform
          </motion.div>

          <motion.h1 variants={revealVariants} className="mt-10 text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            <span className="text-foreground/30">Manage Clients, Hosting,</span>
            <br />
            Contracts & Invoices
          </motion.h1>

          <motion.p variants={revealVariants} className="mt-7 mx-auto max-w-xl text-muted-foreground text-base leading-relaxed">
            Manage clients, hosting, contracts, billing, and renewals in one place.
          </motion.p>

          <motion.div variants={revealVariants} className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <Link
              to="/signup"
              className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium text-white transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
              style={{ backgroundColor: blue, boxShadow: `0 10px 30px -10px ${blue}` }}
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium border border-border bg-card/70 hover:bg-card transition-all duration-300 hover:-translate-y-0.5"
            >
              Sign In
            </Link>
          </motion.div>

          <motion.div variants={revealVariants} className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            {[
              "Client Management",
              "Hosting Subscription Tracking",
              "PDF Invoices & Receipts",
              "Automated Renewal Reminders",
            ].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <span style={{ color: blue }}>✓</span>
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>


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
            <div className="flex flex-col gap-4">
              <StatCard label="Total Clients" value="1,200+" />
              <StatCard label="Active Subscriptions" value="850+" />
            </div>

            <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 relative overflow-hidden min-h-[260px]">
              <ChartSVG />
              <div
                className="absolute top-6 right-10 px-3 py-1 rounded-full text-xs border"
                style={{ borderColor: blue, color: blue, background: "rgba(82,205,239,0.08)" }}
              >
                Renewals On-Time <span className="font-semibold">+98%</span>
              </div>
              <div
                className="absolute bottom-16 left-1/3 px-3 py-1 rounded-full text-xs border"
                style={{ borderColor: blue, color: blue, background: "rgba(82,205,239,0.08)" }}
              >
                Admin Time <span className="font-semibold">-45%</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <StatCard label="Invoices Issued" value="10K+" />
              <StatCard label="Reminders Automated" value="24/7" />
            </div>
          </div>
        </div>
      </main>

      {/* Features */}
      <div
        className="w-full bg-zinc-950 relative z-[1] pt-20 pb-20"
        style={{
          clipPath: "polygon(0 80px, 100% 0, 100% calc(100% - 80px), 0 100%)",
          marginTop: "-80px",
          marginBottom: "-80px",
        }}
      >
        <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-white">
          <Reveal className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Everything You Need To Manage Your Hosting Clients
            </h2>
            <p className="mt-5 text-neutral-400">
              Stop juggling spreadsheets and manual follow-ups. OgulaDesk
              centralizes your client operations so you can focus on growing your
              business.
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} dark />
            ))}
          </RevealGroup>
        </section>
      </div>

      {/* How it works */}
      <section id="how-it-works" className="relative z-10 max-w-6xl mx-auto px-6 pt-32">
        <Reveal className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Manage Your Entire Client Lifecycle In Four Simple Steps
          </h2>
        </Reveal>
        <RevealGroup className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              variants={revealVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="rounded-2xl border border-border bg-card p-6 relative transition-shadow duration-500 hover:shadow-[0_18px_50px_-25px_rgba(82,205,239,0.6)]"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                style={{ backgroundColor: blue, boxShadow: `0 8px 24px -8px ${blue}` }}
              >
                {i + 1}
              </div>
              <h3 className="mt-5 font-semibold text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </section>

      {/* Benefits */}
      <div
        className="w-full bg-zinc-950 relative z-[1] pt-20 pb-20"
        style={{
          clipPath: "polygon(0 80px, 100% 0, 100% calc(100% - 80px), 0 100%)",
          marginTop: "-80px",
          marginBottom: "-80px",
        }}
      >
        <section className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-white">
          <Reveal className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Why Businesses Choose OgulaDesk
            </h2>
          </Reveal>
          <RevealGroup className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <motion.div
                key={b.title}
                variants={revealVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: easeOut }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 transition-shadow duration-500 hover:shadow-[0_18px_50px_-25px_rgba(82,205,239,0.6)] hover:border-[rgba(82,205,239,0.4)]"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(82,205,239,0.12)", color: blue }}
                >
                  ✓
                </div>
                <h3 className="mt-5 font-semibold text-white">{b.title}</h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </section>
      </div>


      {/* Dashboard preview */}
      <section id="dashboard" className="relative z-10 max-w-6xl mx-auto px-6 pt-32">
        <Reveal className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            One Dashboard. Complete Control.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Everything you need is available from a centralized and intuitive
            dashboard.
          </p>
        </Reveal>
        <RevealGroup className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3" stagger={0.05}>
          {[
            "Total Clients",
            "Active Hosting Subscriptions",
            "Pending Invoices",
            "Paid Invoices",
            "Expiring Subscriptions",
            "Recent Notifications",
          ].map((m) => (
            <motion.div
              key={m}
              variants={revealVariants}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="rounded-2xl border border-border bg-card p-5 text-center transition-shadow duration-500 hover:shadow-[0_18px_50px_-25px_rgba(82,205,239,0.6)]"
            >
              <div className="text-xs text-muted-foreground">{m}</div>
            </motion.div>
          ))}
        </RevealGroup>
      </section>

      {/* Roles */}
      <div
        className="w-full bg-zinc-950 relative z-[1] pt-20 pb-20"
        style={{
          clipPath: "polygon(0 80px, 100% 0, 100% calc(100% - 80px), 0 100%)",
          marginTop: "-80px",
          marginBottom: "-80px",
        }}
      >
        <section className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-white">
          <Reveal className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Built For Teams</h2>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
            <RoleCard
              dark
              title="Super Admin"
              items={[
                "Manage the entire system",
                "Create and manage admins",
                "View all records",
                "Access all modules",
              ]}
            />
            <RoleCard
              dark
              title="Admin"
              items={[
                "Manage clients",
                "Create subscriptions",
                "Generate invoices",
                "Generate receipts",
                "Monitor notifications",
              ]}
            />
          </RevealGroup>
        </section>
      </div>

      {/* CTA */}
      <section id="cta" className="relative z-10 max-w-4xl mx-auto px-6 pt-32">
        <Reveal>
          <div
            className="relative rounded-3xl border border-border bg-card/70 backdrop-blur p-12 text-center overflow-hidden"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(82,205,239,0.18), transparent 70%)",
            }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Ready To Simplify Client and Hosting Management?
            </h2>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
              Start managing clients, subscriptions, contracts, invoices, and
              reminders from a single platform designed for efficiency and growth.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
                style={{ backgroundColor: blue, boxShadow: `0 10px 30px -10px ${blue}` }}
              >
                Create Account
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium border border-border bg-card hover:bg-card/80 transition-all duration-300 hover:-translate-y-0.5"
              >
                Login
              </Link>
          </div>
          </div>
        </Reveal>
      </section>


      {/* Contact */}
      <div
        className="w-full bg-zinc-950 relative z-[1] pt-20 pb-20"
        style={{
          clipPath: "polygon(0 80px, 100% 0, 100% calc(100% - 80px), 0 100%)",
          marginTop: "-80px",
          marginBottom: "-80px",
        }}
      >
      <section id="contact" className="relative z-10 py-28 px-6 text-white">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: blue }}>Get in touch</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Let's talk.</h2>
              <p className="mt-4 text-neutral-400 max-w-md mx-auto">
                Have a question, a feature request, or just want to say hi? Drop us a message and we'll get back to you.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.04] overflow-hidden p-8 md:p-12">
              {/* decorative glow */}
              <div
                className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-15"
                style={{ background: blue }}
              />
              <div
                className="pointer-events-none absolute -bottom-32 -left-32 w-72 h-72 rounded-full blur-3xl opacity-10"
                style={{ background: blue }}
              />

              <div className="relative grid md:grid-cols-2 gap-12">
                {/* Left — info */}
                <div className="flex flex-col justify-between gap-8">
                  <div>
                    <p className="text-lg font-semibold mb-2 text-white">OgulaDesk Support</p>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      We're a small, focused team. Expect a real reply — not a bot — within one business day.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <a
                      href="mailto:hello@oguladesk.com"
                      className="flex items-center gap-3 group"
                    >
                      <span
                        className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/[0.12] group-hover:border-[#52CDEF]/50 transition"
                        style={{ background: `${blue}12` }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      </span>
                      <span className="text-sm text-neutral-400 group-hover:text-white transition">hello@oguladesk.com</span>
                    </a>

                    <a
                      href="https://twitter.com/oguladesk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group"
                    >
                      <span
                        className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/[0.12] group-hover:border-[#52CDEF]/50 transition"
                        style={{ background: `${blue}12` }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={blue}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      </span>
                      <span className="text-sm text-neutral-400 group-hover:text-white transition">@oguladesk</span>
                    </a>
                  </div>

                  <p className="text-xs text-neutral-600">
                    Mon – Fri · 9 AM – 6 PM WAT
                  </p>
                </div>

                {/* Right — form */}
                <form
                  className="space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-neutral-400">Name</label>
                      <input
                        type="text"
                        placeholder="Jane Smith"
                        className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/[0.1] text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-[#52CDEF]/60 transition"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-neutral-400">Email</label>
                      <input
                        type="email"
                        placeholder="jane@example.com"
                        className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/[0.1] text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-[#52CDEF]/60 transition"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-neutral-400">Subject</label>
                    <input
                      type="text"
                      placeholder="What's on your mind?"
                      className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/[0.1] text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-[#52CDEF]/60 transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-neutral-400">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us more..."
                      className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/[0.1] text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-[#52CDEF]/60 transition resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full text-sm font-semibold text-white transition hover:opacity-90 hover:-translate-y-0.5 duration-200"
                    style={{ backgroundColor: blue, boxShadow: `0 8px 24px -8px ${blue}` }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-12">
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-3">
              <Logo className="w-8 h-8" />
              <span className="font-semibold">OgulaDesk</span>
            </a>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Simple Client Management. Reliable Hosting Administration.
            </p>
          </div>
          <FooterCol title="Product" links={["Features", "Dashboard", "Pricing"]} />
          <FooterCol title="Account" links={["Login", "Sign Up"]} />
          <FooterCol title="Support" links={["Help Center", "Contact Support"]} />
        </div>
        <div className="mt-10 text-xs text-muted-foreground">
          © 2026 OgulaDesk. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Client Management",
    desc: "Keep all client information organized and accessible.",
    items: [
      "Add and manage clients",
      "Update client information",
      "Assign services to clients",
      "View complete client profiles",
    ],
  },
  {
    title: "Hosting Subscription Tracking",
    desc: "Never lose track of hosting periods again.",
    items: [
      "Monitor active subscriptions",
      "Track start and end dates",
      "View subscription status",
      "Manage hosting services efficiently",
    ],
  },
  {
    title: "Contract Management",
    desc: "Track service agreements with confidence.",
    items: [
      "One-time contracts",
      "Long-term contracts",
      "Auto-renewal tracking",
      "Contract status visibility",
    ],
  },
  {
    title: "Invoice Generation",
    desc: "Create professional invoices in seconds.",
    items: [
      "Generate PDF invoices",
      "Track invoice status",
      "View pending invoices",
      "Auto-cancel after 30 days",
    ],
  },
  {
    title: "Receipt Management",
    desc: "Maintain accurate payment records.",
    items: [
      "Generate PDF receipts",
      "Store receipt history",
      "Link receipts to invoices",
      "Access payment records instantly",
    ],
  },
  {
    title: "Automated Notifications",
    desc: "Stay ahead of renewals and deadlines.",
    items: [
      "Hosting expiry reminders",
      "Subscription renewal alerts",
      "Invoice reminders",
      "Notification history tracking",
    ],
  },
];

const steps = [
  { title: "Add Your Clients", desc: "Register clients and store their information securely within the system." },
  { title: "Assign Hosting Services", desc: "Create subscriptions and define hosting periods for each client." },
  { title: "Manage Contracts & Billing", desc: "Track contract types, generate invoices, and record payments through receipts." },
  { title: "Receive Automated Reminders", desc: "Let OgulaDesk notify you about upcoming hosting renewals and invoice deadlines." },
];

const benefits = [
  { title: "Save Time", desc: "Reduce manual administrative work and repetitive tracking tasks." },
  { title: "Stay Organized", desc: "Manage clients, subscriptions, contracts, invoices, and receipts from one dashboard." },
  { title: "Improve Accuracy", desc: "Minimize errors caused by spreadsheets and manual record keeping." },
  { title: "Never Miss Renewals", desc: "Receive timely reminders before hosting plans expire." },
  { title: "Professional Billing", desc: "Generate and store PDF invoices and receipts effortlessly." },
  { title: "Better Visibility", desc: "Monitor client activities and hosting subscriptions in real time." },
];

function FeatureCard({ title, desc, items, dark }: { title: string; desc: string; items: string[]; dark?: boolean }) {
  return (
    <motion.div
      variants={revealVariants}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.45, ease: easeOut }}
      className={`group relative rounded-2xl p-6 overflow-hidden transition-shadow duration-500 hover:shadow-[0_22px_60px_-28px_rgba(82,205,239,0.55)] hover:border-[rgba(82,205,239,0.4)] ${dark ? "border border-white/[0.08] bg-white/[0.04]" : "border border-border bg-card"}`}
    >
      <div
        className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(82,205,239,0.35), transparent 70%)" }}
      />
      <h3 className={`font-semibold text-lg ${dark ? "text-white" : ""}`}>{title}</h3>
      <p className={`mt-2 text-sm ${dark ? "text-neutral-400" : "text-muted-foreground"}`}>{desc}</p>
      <ul className="mt-4 space-y-2">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span style={{ color: blue }} className="mt-0.5">✓</span>
            <span className={dark ? "text-neutral-400" : "text-muted-foreground"}>{i}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function RoleCard({ title, items, dark }: { title: string; items: string[]; dark?: boolean }) {
  return (
    <motion.div
      variants={revealVariants}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.45, ease: easeOut }}
      className={`group relative rounded-2xl p-8 overflow-hidden transition-shadow duration-500 hover:shadow-[0_22px_60px_-28px_rgba(82,205,239,0.55)] hover:border-[rgba(82,205,239,0.4)] ${dark ? "border border-white/[0.08] bg-white/[0.04]" : "border border-border bg-card"}`}
    >
      <div
        className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(82,205,239,0.3), transparent 70%)" }}
      />
      <h3 className={`font-semibold text-xl ${dark ? "text-white" : ""}`}>{title}</h3>
      <ul className="mt-5 space-y-2">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span style={{ color: blue }} className="mt-0.5">✓</span>
            <span className={dark ? "text-neutral-400" : "text-muted-foreground"}>{i}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}


function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-sm font-semibold">{title}</div>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              {l}
            </a>
          </li>
        ))}
      </ul>
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

function ChartSVG() {
  return (
    <svg viewBox="0 0 500 220" className="w-full h-full absolute inset-0 p-6">
      <defs>
        <linearGradient id="up" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={blue} stopOpacity="0.35" />
          <stop offset="100%" stopColor={blue} stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: 40 }).map((_, i) => (
        <circle key={i} cx={(i * 13) % 500} cy={(i * 29) % 220} r="1" fill={blue} opacity="0.25" />
      ))}
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
