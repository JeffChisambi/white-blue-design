import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import ogulaLogo from "@/assets/ogulalogo.svg";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account — OgulaDesk" },
      { name: "description", content: "Sign up for OgulaDesk and start managing your clients and hosting subscriptions." },
    ],
  }),
  component: SignUp,
});

const blue = "#52CDEF";
const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">

      {/* Ambient gradients — top area only */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[800px] overflow-hidden">
        <div
          className="absolute left-1/2 top-[-200px] h-[700px] w-[1000px] -translate-x-1/2 rounded-full blur-2xl opacity-50"
          style={{
            background:
              "radial-gradient(closest-side, rgba(82,205,239,0.22), rgba(82,205,239,0.06) 55%, transparent 75%)",
          }}
        />
        <div
          className="absolute left-[5%] top-[160px] h-[320px] w-[320px] rounded-full blur-2xl opacity-40"
          style={{
            background: "radial-gradient(closest-side, rgba(82,205,239,0.18), transparent 70%)",
          }}
        />
        <div
          className="absolute right-[5%] top-[100px] h-[340px] w-[340px] rounded-full blur-2xl opacity-30"
          style={{
            background: "radial-gradient(closest-side, rgba(120,170,255,0.16), transparent 70%)",
          }}
        />
      </div>

      {/* Dot grid — top area only */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[800px]"
        style={{
          backgroundImage: "radial-gradient(rgba(10,10,10,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 85%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />

      {/* Nav */}
      <header className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={ogulaLogo} alt="OgulaDesk" className="h-8 w-auto" />
          </Link>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium transition hover:opacity-80"
              style={{ color: blue }}
            >
              Sign in
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
          <motion.div variants={fadeUp} transition={{ duration: 0.45, ease: easeOut }} className="text-center mb-8">
            <div
              className="inline-flex items-center px-4 py-1.5 rounded-full border border-border bg-card text-xs mb-5"
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full mr-2"
                style={{ backgroundColor: blue, boxShadow: `0 0 10px ${blue}` }}
              />
              Free to get started
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Create your account</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Manage clients, hosting, and billing from one dashboard.
            </p>
          </motion.div>

          {/* Card */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.45, ease: easeOut }}
            className="rounded-2xl border border-border bg-card p-8 shadow-[0_8px_40px_-16px_rgba(82,205,239,0.18)]"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Full name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 outline-none transition focus:border-[#52CDEF] focus:ring-2 focus:ring-[#52CDEF]/20"
                />
              </div>

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
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    placeholder="Min. 8 characters"
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

              {/* Confirm password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="confirm" className="text-sm font-medium">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="confirm"
                    name="confirm"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    placeholder="Repeat your password"
                    value={form.confirm}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 pr-10 text-sm placeholder:text-muted-foreground/50 outline-none transition focus:border-[#52CDEF] focus:ring-2 focus:ring-[#52CDEF]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ opacity: 0.9, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="mt-2 w-full rounded-full py-3 text-sm font-medium text-white transition-all"
                style={{ backgroundColor: blue, boxShadow: `0 10px 30px -10px ${blue}` }}
              >
                Create account
              </motion.button>

              {/* Terms */}
              <p className="text-center text-xs text-muted-foreground leading-relaxed">
                By creating an account you agree to our{" "}
                <a href="#" className="underline underline-offset-2 hover:text-foreground transition">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="underline underline-offset-2 hover:text-foreground transition">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </motion.div>

          {/* Benefits row */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.45, ease: easeOut }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
          >
            {["No credit card required", "Free forever plan", "Cancel anytime"].map((t) => (
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
