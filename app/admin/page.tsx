import type { Metadata } from "next";
import Link from "next/link";
import Window from "@/components/Window";
import { isAdmin } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Edit the site",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function AdminPage({ searchParams }: Props) {
  const [{ error }, admin] = await Promise.all([searchParams, isAdmin()]);

  return (
    <div className="mx-auto flex max-w-md flex-col px-5 py-16 sm:py-24">
      <Window
        title="editor_login.exe"
        className="win-open"
        bodyClassName="px-6 pb-8 pt-7 sm:px-8"
      >
        {admin ? (
          <>
            <h1 className="pixel pixel-shadow text-[3.75rem]">You’re in</h1>
            <p className="mt-2 text-ink-soft">
              Open any page and press{" "}
              <strong className="text-ink">✎ Edit site</strong> in the toolbar
              at the bottom.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/?edit=1" className="btn btn-lime">
                Start editing{" "}
                <span aria-hidden className="arrow">
                  →
                </span>
              </Link>
              <form action="/api/admin/logout" method="POST">
                <button type="submit" className="btn btn-paper">
                  Log out of editor
                </button>
              </form>
            </div>
          </>
        ) : (
          <>
            <h1 className="pixel pixel-shadow text-[3.75rem]">Edit mode</h1>
            <p className="mt-2 text-ink-soft">
              Enter the editor password to change text and photos on the site.
            </p>
            <form action="/api/admin/login" method="POST" className="mt-7">
              <label
                htmlFor="admin-password"
                className="mb-1.5 block font-semibold"
              >
                Editor password
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="admin-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  autoFocus
                  className="bare min-h-[2.9rem] min-w-0 flex-1 rounded-md border-[1.5px] border-ink bg-paper px-3 text-lg outline-none focus:shadow-[3px_3px_0_var(--peri)]"
                />
                <button type="submit" className="btn btn-lime justify-center">
                  Log in{" "}
                  <span aria-hidden className="arrow">
                    →
                  </span>
                </button>
              </div>
              {error === "1" && (
                <p
                  className="mt-4 rounded-md border-[1.5px] border-[#b3261e] bg-[#fff1f0] px-3 py-2 text-sm font-medium text-[#8c1d18]"
                  role="alert"
                >
                  That’s not the editor password. Try again.
                </p>
              )}
            </form>
          </>
        )}
      </Window>
    </div>
  );
}
