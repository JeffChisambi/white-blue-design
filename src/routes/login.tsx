import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import ogulaLogo from "@/assets/ogulalogo.svg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — OgulaDesk" },
      { name: "description", content: "Sign in to your OgulaDesk account." },
    ],
  }),
  component: Login,
});

const blue = "#52CDEF";
const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">

      {/* Ambient gradients — top area only */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[700px] overflow-hidden">
        <div
          className="absolute left-1/2 top-[-200px] h-[640px] w-[900px] -translate-x-1/2 rounded-full blur-2xl opacity-50"
          style={{
            background:
              "radial-gradient(closest-side, rgba(82,205,239,0.22), rgba(82,205,239,0.06) 55%, transparent 75%)",
          }}
        />
        <div
          className="absolute left-[5%] top-[140px] h-[300px] w-[300px] rounded-full blur-2xl opacity-35"
          style={{
            background: "radial-gradient(closest-side, rgba(82,205,239,0.18), transparent 70%)",
          }}
        />
        <div
          className="absolute right-[5%] top-[80px] h-[320px] w-[320px] rounded-full blur-2xl opacity-30"
          style={{
            background: "radial-gradient(closest-side, rgba(120,170,255,0.16), transparent 70%)",
          }}
        />
      </div>

      {/* Dot grid — top area only */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[700px]"
        style={{
          backgroundImage: "radial-gradient(rgba(10,10,10,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 85%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />

      {/* Nav */}
      <header className={`sticky top-0 z-20 w-full transition-all duration-300 ${scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : ""}`}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={ogulaLogo} alt="OgulaDesk" className="h-8 w-auto" />
          </Link>
          <p className="text-sm text-muted-foreground">
            No account yet?{" "}
            <Link
              to="/signup"
              className="font-medium transition hover:opacity-80"
              style={{ color: blue }}
            >
              Create one
            </Link>
          </p>
        </div>
      </header>

      {/* Form */}
      <main className="relative z-10 flex items-center justify-center px-6 py-16 md:py-24">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          className="w-full max-w-md"
        >
          {/* Heading */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.45, ease: easeOut }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-border bg-card text-xs mb-5">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full mr-2"
                style={{ backgroundColor: blue, boxShadow: `0 0 10px ${blue}` }}
              />
              Welcome back
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Sign in to OgulaDesk</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Pick up right where you left off.
            </p>
          </motion.div>

          {/* Card */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.45, ease: easeOut }}
            className="rounded-2xl border border-border bg-card p-8 shadow-[0_8px_40px_-16px_rgba(82,205,239,0.18)]"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 outline-none transition focus:border-[#52CDEF] focus:ring-2 focus:ring-[#52CDEF]/20"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-muted-foreground transition hover:text-foreground"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="Your password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 pr-10 text-sm placeholder:text-muted-foreground/50 outline-none transition focus:border-[#52CDEF] focus:ring-2 focus:ring-[#52CDEF]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border border-border bg-background accent-[#52CDEF] cursor-pointer"
                />
                <span className="text-sm text-muted-foreground">Remember me for 30 days</span>
              </label>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ opacity: 0.9, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="mt-1 w-full rounded-full py-3 text-sm font-medium text-white transition-all"
                style={{ backgroundColor: blue, boxShadow: `0 10px 30px -10px ${blue}` }}
              >
                Sign in
              </motion.button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Create account link */}
              <Link
                to="/signup"
                className="w-full rounded-full py-3 text-sm font-medium border border-border bg-background text-center transition hover:bg-card"
              >
                Create a new account
              </Link>
            </form>
          </motion.div>

          {/* Reassurance row */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.45, ease: easeOut }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
          >
            {["256-bit encryption", "SOC 2 compliant", "99.9% uptime SLA"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <span style={{ color: blue }}>✓</span>
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
