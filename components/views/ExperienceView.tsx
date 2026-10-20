"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { AddButton, Href, ItemTools, T } from "@/components/edit/Editable";
import { useEdit } from "@/components/edit/EditProvider";
import Thumb from "@/components/views/Thumb";
import { templates } from "@/lib/content";
import Block, {
  Sections,
  SortArea,
  slugId,
  useListMove,
} from "@/components/edit/Block";

/** /experience: a calm résumé timeline. Highlights are chips that open in place. */
export default function ExperienceView() {
  const { content: c, editing } = useEdit();
  const moveJob = useListMove(["experience"]);

  return (
    <div className="mx-auto max-w-5xl px-5 pb-20 sm:px-8">
      <PageHeader at="experiencePage" />
      <Sections
        page="experience"
        items={[
          {
            id: "experience.timeline",
            node: (
              <Block
                id="experience.timeline"
                kind="section"
                label="Timeline"
                as="ol"
                className="mt-2"
              >
                <SortArea
                  ids={c.experience.map((_, i) => `j${i}`)}
                  onMove={moveJob}
                >
                  {c.experience.map((job, i) => (
                    <Block
                      key={i}
                      id={`job.${slugId(job.company)}`}
                      sortKey={`j${i}`}
                      kind="item"
                      label="Job"
                      as="li"
                      className="relative grid gap-1 md:grid-cols-[10rem_1fr] md:gap-10"
                    >
                      <ItemTools
                        path={["experience"]}
                        index={i}
                        length={c.experience.length}
                        noun="job"
                        confirmRemove
                        className="right-0 top-1"
                      />
                      <div className="pt-7 font-mono text-xs text-ink-soft md:pt-8 md:text-right">
                        <p className="text-sm text-ink">
                          <T path={["experience", i, "period"]} />
                        </p>
                        <p className="mt-0.5">
                          <T path={["experience", i, "location"]} />
                        </p>
                      </div>
                      <div className="relative border-l border-peri pb-10 pl-6 pt-1 md:pt-7 sm:pl-8">
                        <span
                          aria-hidden
                          className="absolute -left-[7px] top-3 h-3.5 w-3.5 rounded-full border-[1.5px] border-ink bg-lime md:top-9"
                        />
                        <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
                          <T path={["experience", i, "company"]} />
                        </h2>
                        {(job.about || editing) && (
                          <p className="mt-0.5 text-sm text-ink-soft">
                            <T
                              path={["experience", i, "about"]}
                              placeholder="One line about the company (optional)"
                            />
                          </p>
                        )}
                        <ul className="mt-5 grid gap-7">
                          {job.roles.map((r, j) => (
                            <Role key={j} i={i} j={j} />
                          ))}
                        </ul>
                        <AddButton
                          path={["experience", i, "roles"]}
                          make={() => structuredClone(templates.role)}
                          label="Add role"
                          className="mt-5"
                        />
                      </div>
                    </Block>
                  ))}
                </SortArea>
                {editing && (
                  <AddButton
                    path={["experience"]}
                    make={() => ({
                      ...structuredClone(templates.job),
                      roles: [structuredClone(templates.role)],
                    })}
                    label="Add job"
                  />
                )}
              </Block>
            ),
          },
          {
            id: "experience.more",
            node: (
              <Block
                id="experience.more"
                kind="section"
                label="Education & more"
                className="mt-14 grid gap-12 border-t border-line pt-12 md:grid-cols-2 md:gap-14"
              >
                <section aria-labelledby="edu-title">
                  <h2 id="edu-title" className="pixel text-4xl">
                    <T path={["experiencePage", "educationHeading"]} />
                  </h2>
                  <ul className="mt-4 space-y-5">
                    {c.education.map((e, i) => (
                      <li key={i} className="relative">
                        <ItemTools
                          path={["education"]}
                          index={i}
                          length={c.education.length}
                          noun="school"
                          confirmRemove
                        />
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                          <h3 className="text-lg font-semibold">
                            <T path={["education", i, "school"]} />
                          </h3>
                          <p className="font-mono text-sm text-ink-soft">
                            <T path={["education", i, "period"]} />
                          </p>
                        </div>
                        <p className="mt-0.5 text-sm">
                          <T path={["education", i, "degree"]} multiline />
                        </p>
                        {(e.note || editing) && (
                          <p className="mt-1 whitespace-pre-line text-sm text-ink-soft">
                            <T
                              path={["education", i, "note"]}
                              multiline
                              placeholder="Note (optional)"
                            />
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                  <AddButton
                    path={["education"]}
                    make={() => ({ ...templates.education })}
                    label="Add school"
                    className="mt-5"
                  />
                </section>

                <section aria-labelledby="also-title">
                  <h2 id="also-title" className="pixel text-4xl">
                    <T path={["experiencePage", "alsoHeading"]} />
                  </h2>
                  <dl className="mt-4 space-y-2.5 text-sm">
                    {c.resumeExtras.map((_, i) => (
                      <div
                        key={i}
                        className="relative grid gap-0.5 sm:grid-cols-[6.5rem_1fr] sm:gap-4"
                      >
                        <dt className="label sm:pt-0.5">
                          <T path={["resumeExtras", i, "label"]} />
                        </dt>
                        <dd>
                          <T path={["resumeExtras", i, "value"]} multiline />
                        </dd>
                        <ItemTools
                          path={["resumeExtras"]}
                          index={i}
                          length={c.resumeExtras.length}
                          noun="row"
                          className="-right-2 top-0 translate-x-full"
                        />
                      </div>
                    ))}
                  </dl>
                  <AddButton
                    path={["resumeExtras"]}
                    make={() => ({ ...templates.extra })}
                    label="Add row"
                    className="mt-5"
                  />
                </section>
              </Block>
            ),
          },
        ]}
      />
    </div>
  );
}

function Role({ i, j }: { i: number; j: number }) {
  const { content: c, editing } = useEdit();
  const r = c.experience[i].roles[j];
  const [open, setOpen] = useState<number | null>(null);
  const hl = c.projects
    .map((p, k) => ({ p, k }))
    .filter(
      ({ p }) => p.role === r.title && c.experience[i].company === "Numenta",
    );
  return (
    <li className="relative">
      <ItemTools
        path={["experience", i, "roles"]}
        index={j}
        length={c.experience[i].roles.length}
        noun="role"
        className="right-0 -top-6"
      />
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="text-lg font-semibold">
          <T path={["experience", i, "roles", j, "title"]} />
        </h3>
        {(editing ||
          c.experience[i].roles.length > 1 ||
          r.period !== c.experience[i].period) && (
          <p className="font-mono text-xs text-ink-soft">
            <T path={["experience", i, "roles", j, "period"]} />
          </p>
        )}
      </div>
      <ul className="mt-1.5 grid max-w-2xl gap-1 text-ink-soft">
        {r.bullets.slice(0, 3).map((_, k) => (
          <li key={k} className="relative">
            <T path={["experience", i, "roles", j, "bullets", k]} multiline />
            <ItemTools
              path={["experience", i, "roles", j, "bullets"]}
              index={k}
              length={r.bullets.length}
              noun="line"
              className="-top-5 right-0"
            />
          </li>
        ))}
        {editing && r.bullets.length < 3 && (
          <li>
            <AddButton
              path={["experience", i, "roles", j, "bullets"]}
              make={() => templates.bullet}
              label="Add a line"
            />
          </li>
        )}
      </ul>
      {(hl.length > 0 || editing) && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {hl.map(({ p, k }) => (
              <button
                key={k}
                type="button"
                id={p.slug}
                aria-expanded={open === k}
                onClick={() => setOpen(open === k ? null : k)}
                className={`group inline-flex scroll-mt-28 items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-sm font-medium transition-colors ${
                  open === k
                    ? "border-ink bg-lime"
                    : "border-line bg-paper/80 hover:border-ink"
                }`}
              >
                <span className="grid h-6 min-w-6 place-items-center rounded-full bg-desk px-1.5 font-mono text-[0.65rem] text-ink">
                  {p.metric.value}
                </span>
                {p.title}
                <span aria-hidden className="text-xs text-ink-soft">
                  {open === k ? "−" : "+"}
                </span>
              </button>
            ))}
            <AddButton
              path={["projects"]}
              make={() => ({ ...templates.project(), role: r.title })}
              label="Add highlight"
            />
          </div>
          {open !== null && hl.some((h) => h.k === open) && (
            <Highlight k={open} />
          )}
        </div>
      )}
    </li>
  );
}

const steps = [
  { key: "problem", label: "problemLabel" },
  { key: "did", label: "didLabel" },
  { key: "result", label: "resultLabel" },
] as const;

function Highlight({ k }: { k: number }) {
  const { content: c, editing, setAt } = useEdit();
  const p = c.projects[k];
  return (
    <div className="relative mt-3 grid gap-5 rounded-lg border border-line bg-paper/80 p-4 sm:p-5 md:grid-cols-[1fr_12rem]">
      <ItemTools
        path={["projects"]}
        index={k}
        length={c.projects.length}
        noun="highlight"
        confirmRemove
        className="right-2 -top-3"
      />
      <div>
        <p className="flex flex-wrap items-baseline gap-x-3">
          <span className="pixel pixel-shadow text-5xl">
            <T path={["projects", k, "metric", "value"]} />
          </span>
          <span className="text-sm text-ink-soft">
            <T path={["projects", k, "metric", "label"]} />
          </span>
        </p>
        <p className="mt-1 font-semibold">
          <T path={["projects", k, "title"]} />
          <span className="font-normal text-ink-soft">
            {" "}
            · <T path={["projects", k, "year"]} />
          </span>
        </p>
        <dl className="mt-3 grid gap-2 text-sm">
          {steps.map((s) => (
            <div
              key={s.key}
              className="grid gap-0.5 sm:grid-cols-[6rem_1fr] sm:gap-4"
            >
              <dt className="label pt-0.5">
                <T path={["projectsPage", s.label]} />
              </dt>
              <dd>
                <T path={["projects", k, s.key]} multiline />
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="flex flex-col gap-3">
        {(p.media?.src || editing) && (
          <Block
            id={`project.${p.slug || k}.media`}
            kind="image"
            label="Picture"
            className="block w-full max-w-[13rem]"
          >
            <Thumb
              m={p.media}
              path={["projects", k, "media"]}
              title={p.media?.caption}
            />
          </Block>
        )}
        {p.badge && (
          <span className="relative">
            <a
              href={p.badge.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-1.5 rounded-md border border-ink bg-lime px-2 py-1 font-mono text-[0.68rem] font-medium leading-5 text-ink"
            >
              ★ <T path={["projects", k, "badge", "label"]} /> ↗
            </a>
            <Href path={["projects", k, "badge", "href"]} />
            {editing && (
              <button
                type="button"
                data-editor-ui=""
                aria-label="Remove badge"
                className="ml-1 rounded-full border-[1.5px] border-ink bg-paper px-1.5 font-mono text-xs hover:bg-pink"
                onClick={() => setAt(["projects", k, "badge"], undefined)}
              >
                ✕
              </button>
            )}
          </span>
        )}
        {(p.links?.length || editing) && (
          <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
            {p.links?.map((l, j) => (
              <span key={j} className="relative">
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ulink"
                >
                  <T path={["projects", k, "links", j, "label"]} /> ↗
                </a>
                <Href path={["projects", k, "links", j, "href"]} />
                {editing && (
                  <ItemTools
                    path={["projects", k, "links"]}
                    index={j}
                    length={p.links!.length}
                    noun="link"
                    className="-top-6 left-0"
                  />
                )}
              </span>
            ))}
            <AddButton
              path={["projects", k, "links"]}
              make={() => ({ ...templates.link })}
              label="Add link"
            />
          </p>
        )}
      </div>
    </div>
  );
}
