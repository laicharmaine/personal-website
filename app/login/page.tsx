import type { Metadata } from "next";
import PixelIcon from "@/components/PixelIcon";
import Window from "@/components/Window";
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
    <div className="flex min-h-svh flex-col items-center justify-center px-4 py-12">
      <p className="mb-6 flex items-center gap-3 text-lg font-semibold text-ink">
        <span
          aria-hidden
          className="holo grid h-8 w-8 place-items-center border-2 border-ink font-mono text-xs shadow-[2px_2px_0_var(--ink)]"
        >
          CL
        </span>
        Charmaine Lai
      </p>

      <Window
        as="section"
        title="Log On"
        className="win-open w-full max-w-md"
        bodyClassName="px-6 py-7 sm:px-8"
        labelledBy="login-title"
      >
        <div className="flex gap-4">
          <div className="bevel-out grid h-16 w-16 flex-none place-items-center">
            <PixelIcon name="key" size={40} />
          </div>
          <div>
            <p className="font-mono text-sm font-medium text-peri-deep">Private site</p>
            <h1 id="login-title" className="mt-1 font-display text-3xl font-bold leading-none">
              Enter password
            </h1>
            <p className="mt-2 leading-relaxed text-ink-soft">
              This site is password-protected. Enter the shared password to
              continue.
            </p>
          </div>
        </div>

        <form action={loginAction} className="mt-7 space-y-4">
          <input type="hidden" name="next" value={next} />
          <div>
            <label htmlFor="password" className="mb-1.5 block font-semibold">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              autoFocus
              className="bevel-in w-full px-3 py-2.5 font-mono text-base text-ink outline-none placeholder:text-ink-soft/60 focus:bg-peri-light/40"
              placeholder="••••••••••••"
            />
          </div>

          {hasError && (
            <p
              className="flex items-center gap-3 border-2 border-ink bg-[#ffe1ef] px-3 py-2 text-sm font-medium text-ink"
              role="alert"
            >
              <span
                aria-hidden
                className="grid h-6 w-6 flex-none place-items-center border-2 border-ink bg-pink font-mono text-sm font-bold"
              >
                !
              </span>
              Incorrect password. Try again.
            </p>
          )}

          <div className="flex justify-end pt-1">
            <button type="submit" className="btn btn-primary w-full px-5 py-3 text-base sm:w-auto sm:min-w-32">
              Continue
            </button>
          </div>
        </form>
      </Window>

      <p className="mt-6 font-mono text-sm text-ink-soft">
        © {new Date().getFullYear()} Charmaine Lai · Northwestern MBAi ’28
      </p>
    </div>
  );
}
