"use client";

import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Window from "@/components/Window";
import { AddButton, Href, ItemTools, T } from "@/components/edit/Editable";
import { useEdit } from "@/components/edit/EditProvider";
import Thumb from "@/components/views/Thumb";
import { templates } from "@/lib/content";

const steps = [
  { key: "problem", label: "problemLabel" },
  { key: "did", label: "didLabel" },
  { key: "result", label: "resultLabel" },
] as const;

export default function ProjectsView() {
  const { content: c, editing, setAt } = useEdit();

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <PageHeader at="projectsPage" />

      <Window
        title={<T path={["projectsPage", "window"]} />}
        className="win-open"
        bodyClassName="p-0"
      >
        <ol className="divide-y divide-line">
          {c.projects.map((p, i) => (
            <li key={i} id={p.slug} className="relative scroll-mt-24">
              <ItemTools
                path={["projects"]}
                index={i}
                length={c.projects.length}
                noun="project"
                confirmRemove
                className="right-16 top-2"
              />
              <details className="group" open={editing || undefined}>
                <summary className="file-row grid grid-cols-[1fr_auto] items-center gap-x-5 gap-y-2 px-4 py-6 sm:grid-cols-[10rem_1fr_auto] sm:gap-x-8 sm:px-7">
                  <span className="col-span-2 flex items-baseline gap-3 sm:col-span-1 sm:block">
                    <span className="pixel pixel-shadow block text-[3.75rem] sm:text-[4.5rem]">
                      <T path={["projects", i, "metric", "value"]} />
                    </span>
                    <span className="text-sm font-medium text-ink-soft sm:mt-1 sm:block">
                      <T path={["projects", i, "metric", "label"]} />
                    </span>
                  </span>
                  <span>
                    <span className="font-mono text-xs text-ink-soft">
                      {`0${i + 1}`} · <T path={["projects", i, "org"]} /> ·{" "}
                      <T path={["projects", i, "year"]} />
                    </span>
                    <span className="mt-0.5 block text-xl font-semibold sm:text-2xl">
                      <T path={["projects", i, "title"]} />
                    </span>
                    <span className="muted-on-hover mt-0.5 block text-ink-soft">
                      <T path={["projects", i, "line"]} multiline />
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="toggle grid h-9 w-9 place-items-center rounded-full border-[1.5px] border-ink bg-paper text-xl leading-none"
                  >
                    +
                  </span>
                </summary>
                <div className="details-body flex flex-col gap-6 border-t border-dashed border-line bg-desk/40 px-4 py-6 md:flex-row md:items-start md:justify-between sm:pl-[13rem] sm:pr-7">
                  <dl className="grid flex-1 gap-3">
                    {steps.map((s) => (
                      <div
                        key={s.key}
                        className="grid gap-0.5 sm:grid-cols-[7rem_1fr] sm:gap-6"
                      >
                        <dt className="label pt-0.5">
                          <T path={["projectsPage", s.label]} />
                        </dt>
                        <dd className="max-w-xl">
                          <T path={["projects", i, s.key]} multiline />
                        </dd>
                      </div>
                    ))}
                  </dl>
                  {(p.media?.src || p.badge || p.links?.length || editing) && (
                    <div className="flex w-full max-w-[13rem] shrink-0 flex-col gap-3">
                      <Thumb
                        m={p.media}
                        path={["projects", i, "media"]}
                        title={p.media?.caption}
                      />
                      {(p.badge || editing) && (
                        <span className="relative">
                          {p.badge ? (
                            <a
                              href={p.badge.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full border border-ink bg-lime px-2.5 py-0.5 font-mono text-[0.7rem] font-medium leading-5 text-ink shadow-[2px_2px_0_var(--ink)]"
                            >
                              ★ <T path={["projects", i, "badge", "label"]} /> ↗
                            </a>
                          ) : (
                            <button
                              type="button"
                              data-editor-ui=""
                              className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-dashed border-ink bg-paper/70 px-3 py-1 font-mono text-xs font-medium hover:bg-lime"
                              onClick={() =>
                                setAt(["projects", i, "badge"], {
                                  label: "Featured in …",
                                  href: "https://",
                                })
                              }
                            >
                              + Add badge
                            </button>
                          )}
                          {p.badge && (
                            <Href path={["projects", i, "badge", "href"]} />
                          )}
                          {p.badge && editing && (
                            <button
                              type="button"
                              data-editor-ui=""
                              aria-label="Remove badge"
                              className="ml-1 rounded-full border-[1.5px] border-ink bg-paper px-1.5 font-mono text-xs hover:bg-pink"
                              onClick={() =>
                                window.confirm("Remove this badge?") &&
                                setAt(["projects", i, "badge"], undefined)
                              }
                            >
                              ✕
                            </button>
                          )}
                        </span>
                      )}
                      {(p.links?.length || editing) && (
                        <p className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm font-semibold">
                          {p.links?.map((l, j) => (
                            <span key={j} className="relative">
                              <a
                                href={l.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ulink"
                              >
                                <T
                                  path={["projects", i, "links", j, "label"]}
                                />{" "}
                                ↗
                              </a>
                              <Href
                                path={["projects", i, "links", j, "href"]}
                              />
                              {editing && (
                                <ItemTools
                                  path={["projects", i, "links"]}
                                  index={j}
                                  length={p.links!.length}
                                  noun="link"
                                  className="-top-6 left-0"
                                />
                              )}
                            </span>
                          ))}
                          <AddButton
                            path={["projects", i, "links"]}
                            make={() => ({ ...templates.link })}
                            label="Add link"
                          />
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </details>
            </li>
          ))}
        </ol>
        {editing && (
          <div className="border-t border-line px-4 py-3 sm:px-7">
            <AddButton
              path={["projects"]}
              make={templates.project}
              label="Add project"
            />
          </div>
        )}
      </Window>

      <section className="pt-20 sm:pt-28" aria-labelledby="side-title">
        <h2 id="side-title" className="pixel text-5xl sm:text-6xl">
          <T path={["projectsPage", "sideHeading"]} />
        </h2>
        <ul className="mt-8 grid gap-10 md:grid-cols-3 md:gap-12">
          {c.sideProjects.map((sp, i) => (
            <li key={i} className="relative border-t border-ink pt-5">
              <ItemTools
                path={["sideProjects"]}
                index={i}
                length={c.sideProjects.length}
                noun="side project"
                confirmRemove
              />
              <h3 className="flex items-center gap-2.5 text-xl font-semibold">
                <span
                  aria-hidden
                  className="holo h-4 w-4 rounded-[3px] border-[1.5px] border-ink"
                />
                <T path={["sideProjects", i, "title"]} />
              </h3>
              {(sp.media?.src || editing) && (
                <div className="mt-4">
                  <Thumb
                    m={sp.media}
                    path={["sideProjects", i, "media"]}
                    title={sp.title.toLowerCase() + ".app"}
                  />
                </div>
              )}
              <p className="mt-2 text-ink-soft">
                <T path={["sideProjects", i, "line"]} multiline />
              </p>
              <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                {sp.links?.map((l, j) => (
                  <span key={j} className="relative">
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ulink"
                    >
                      <T path={["sideProjects", i, "links", j, "label"]} /> ↗
                    </a>
                    <Href path={["sideProjects", i, "links", j, "href"]} />
                    {editing && (
                      <ItemTools
                        path={["sideProjects", i, "links"]}
                        index={j}
                        length={sp.links!.length}
                        noun="link"
                        className="-top-6 left-0"
                      />
                    )}
                  </span>
                ))}
                {(sp.note || editing) && (
                  <span className="font-mono font-normal text-ink-soft">
                    <T
                      path={["sideProjects", i, "note"]}
                      placeholder="Note (optional)"
                    />
                  </span>
                )}
                <AddButton
                  path={["sideProjects", i, "links"]}
                  make={() => ({ ...templates.link })}
                  label="Add link"
                />
              </p>
            </li>
          ))}
          <li className="border-t border-ink pt-5">
            <h3 className="flex items-center gap-2.5 text-xl font-semibold">
              <span
                aria-hidden
                className="holo h-4 w-4 rounded-[3px] border-[1.5px] border-ink"
              />
              <T path={["projectsPage", "offTitle"]} />
            </h3>
            <p className="mt-2 text-ink-soft">
              <T path={["projectsPage", "offLine"]} multiline />
            </p>
            <p className="mt-3 text-sm font-semibold">
              <Link href="/fun" className="ulink">
                <T path={["projectsPage", "offLink"]} /> →
              </Link>
            </p>
          </li>
        </ul>
        <AddButton
          path={["sideProjects"]}
          make={() => ({ ...templates.sideProject, links: [] })}
          label="Add side project"
          className="mt-6"
        />
      </section>
    </div>
  );
}
