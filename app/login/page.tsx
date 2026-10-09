import type { Metadata } from "next";
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
    <div className="flex min-h-svh flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <p className="mb-6 flex items-center justify-center gap-2.5">
          <span aria-hidden className="holo h-5 w-5 rounded-[4px] border-[1.5px] border-ink" />
          <span className="pixel text-[2rem] leading-none">
            Charmaine<span className="text-peri-deep">.OS</span>
          </span>
        </p>
        <Window title="log_in.exe" className="win-open" bodyClassName="px-6 pb-8 pt-7 sm:px-8">
          <h1 className="pixel pixel-shadow text-[4rem]">Welcome back</h1>
          <p className="mt-2 text-ink-soft">This site is private. Enter the password to look around.</p>
          <form action={loginAction} className="mt-7">
            <input type="hidden" name="next" value={next} />
            <label htmlFor="password" className="mb-1.5 block font-semibold">
              Password
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                autoFocus
                className="bare min-h-[2.9rem] min-w-0 flex-1 rounded-md border-[1.5px] border-ink bg-paper px-3 text-lg outline-none focus:shadow-[3px_3px_0_var(--peri)]"
              />
              <button type="submit" className="btn btn-lime justify-center">
                Enter <span aria-hidden className="arrow">→</span>
              </button>
            </div>
            {hasError && (
              <p className="mt-4 rounded-md border-[1.5px] border-[#b3261e] bg-[#fff1f0] px-3 py-2 text-sm font-medium text-[#8c1d18]" role="alert">
                That’s not it. Try again.
              </p>
            )}
          </form>
        </Window>
        <p className="mt-6 text-center font-mono text-xs text-ink-soft">© {new Date().getFullYear()} Charmaine Lai</p>
      </div>
    </div>
  );
}
