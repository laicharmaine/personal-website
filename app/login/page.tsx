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
    <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6 sm:py-24">
      <div className="relative overflow-hidden rounded-3xl border border-coral-100 bg-gradient-to-br from-white via-cream to-coral-50 px-6 py-10 shadow-sm sm:px-8">
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-coral-200/40 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-14 -left-8 h-36 w-36 rounded-full bg-coral-100/60 blur-3xl"
          aria-hidden
        />

        <div className="relative">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-coral-600">
            Private site
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
            Enter password
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            This site is password-protected. Enter the shared password to
            continue.
          </p>

          <form action={loginAction} className="mt-8 space-y-4">
            <input type="hidden" name="next" value={next} />
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-stone-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                autoFocus
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition placeholder:text-stone-400 focus:border-coral-400 focus:ring-2 focus:ring-coral-200"
                placeholder="••••••••••••••••"
              />
            </div>

            {hasError && (
              <p
                className="rounded-lg bg-coral-50 px-3 py-2 text-sm text-coral-800 ring-1 ring-coral-200"
                role="alert"
              >
                Incorrect password. Try again.
              </p>
            )}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-coral-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-coral-600"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
