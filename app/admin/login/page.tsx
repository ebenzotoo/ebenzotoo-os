import { loginAction } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div data-admin className="min-h-screen bg-[#050810] flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative w-full max-w-sm px-4">
        <div className="mb-8 text-center">
          <p className="text-[10px] tracking-[0.25em] text-[#D4AF37]/60 uppercase mb-2">
            system access
          </p>
          <h1 className="text-2xl font-bold text-white/90">Admin Terminal</h1>
        </div>

        <div className="bg-[#0A0F1C]/80 border border-white/10 rounded-xl p-6 backdrop-blur-xl">
          {error === "invalid" && (
            <p className="text-red-400 text-xs text-center mb-4 bg-red-400/10 border border-red-400/20 rounded-lg py-2">
              Invalid credentials. Try again.
            </p>
          )}

          <form action={loginAction} className="space-y-4">
            <div>
              <label className="block text-xs text-white/40 mb-1.5 tracking-wide">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/40 focus:bg-white/8 transition-colors"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-xs text-white/40 mb-1.5 tracking-wide">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/40 focus:bg-white/8 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#D4AF37]/90 hover:bg-[#D4AF37] text-[#050810] text-sm font-semibold py-2.5 rounded-lg transition-colors mt-2"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          ← <a href="/" className="hover:text-white/40 transition-colors">back to portfolio</a>
        </p>
      </div>
    </div>
  );
}
