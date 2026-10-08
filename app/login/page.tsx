import type { Metadata } from "next";
import { loginAction } from "./actions";

export const metadata: Metadata = {
  title: "Enter password",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ error?: string; next?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const next = params.next && params.next.startsWith("/") ? params.next : "/";
  const hasError = params.error === "1";

  return (
    <div className="mx-auto flex min-h-svh max-w-6xl flex-col justify-between px-5 py-8 sm:px-8">
      <p className="flex items-center gap-2.5">
        <span aria-hidden className="irid h-3.5 w-3.5 rounded-full ring-1 ring-ink/20" />
        <span className="display-wide text-lg">Charmaine Lai</span>
      </p>

      <div className="fade-up w-full max-w-md py-16">
        <p className="label">Private site</p>
        <h1 className="display mt-4 text-7xl sm:text-8xl">
          Password<span className="text-accent">.</span>
        </h1>
        <form action={loginAction} className="mt-10">
          <input type="hidden" name="next" value={next} />
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <div className="flex items-center gap-3 border-b border-ink pb-2 focus-within:border-accent focus-within:shadow-[0_1px_0_var(--accent)]">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              autoFocus
              placeholder="Enter password"
              className="bare min-w-0 flex-1 bg-transparent py-2 text-xl outline-none placeholder:text-muted"
            />
            <button type="submit" className="btn btn-solid h-11 px-5">
              Enter <span aria-hidden className="arrow">→</span>
            </button>
          </div>
          {hasError && (
            <p className="mt-4 font-mono text-sm text-[#b3261e]" role="alert">
              That’s not it. Try again.
            </p>
          )}
        </form>
      </div>

      <p className="font-mono text-xs text-muted">© {new Date().getFullYear()} Charmaine Lai</p>
    </div>
  );
}
