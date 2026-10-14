"use client";

import PageHeader from "@/components/PageHeader";
import Window from "@/components/Window";
import { AddButton, ItemTools, T } from "@/components/edit/Editable";
import { useEdit } from "@/components/edit/EditProvider";
import { templates } from "@/lib/content";

export default function ExperienceView() {
  const { content: c, editing } = useEdit();

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <PageHeader at="experiencePage" />

      <Window title={<T path={["experiencePage", "window"]} />} className="win-open" bodyClassName="divide-y divide-line">
        {c.experience.map((job, i) => (
          <section key={i} className="relative px-5 py-7 sm:px-8">
            <ItemTools path={["experience"]} index={i} length={c.experience.length} noun="job" confirmRemove className="right-3 top-2" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h2 className="pixel text-[2.75rem]">
                <T path={["experience", i, "company"]} />
              </h2>
              <p className="font-mono text-sm text-ink-soft">
                <T path={["experience", i, "location"]} /> · <T path={["experience", i, "period"]} />
              </p>
            </div>
            {(job.about || editing) && (
              <p className="mt-1 max-w-2xl text-sm text-ink-soft">
                <T path={["experience", i, "about"]} placeholder="One line about the company (optional)" />
              </p>
            )}
            <ul className="mt-4 space-y-5">
              {job.roles.map((r, j) => (
                <li key={j} className="relative grid gap-1.5 sm:grid-cols-[14rem_1fr] sm:gap-8">
                  <ItemTools path={["experience", i, "roles"]} index={j} length={job.roles.length} noun="role" confirmRemove className="-top-4 left-0" />
                  <div>
                    <p className="font-semibold">
                      <T path={["experience", i, "roles", j, "title"]} />
                    </p>
                    {(job.roles.length > 1 || editing) && (
                      <p className="font-mono text-xs text-ink-soft">
                        <T path={["experience", i, "roles", j, "period"]} />
                      </p>
                    )}
                  </div>
                  <ul className="pixel-list max-w-2xl space-y-1.5 text-ink-soft">
                    {r.bullets.map((_, k) => (
                      <li key={k} className="relative">
                        <T path={["experience", i, "roles", j, "bullets", k]} multiline />
                        <ItemTools
                          path={["experience", i, "roles", j, "bullets"]}
                          index={k}
                          length={r.bullets.length}
                          noun="bullet"
                          className="-right-2 top-0 translate-x-full"
                        />
                      </li>
                    ))}
                    {editing && (
                      <li className="!pl-0 before:!hidden">
                        <AddButton path={["experience", i, "roles", j, "bullets"]} make={() => templates.bullet} label="Add bullet" />
                      </li>
                    )}
                  </ul>
                </li>
              ))}
            </ul>
            <AddButton path={["experience", i, "roles"]} make={() => structuredClone(templates.role)} label="Add role" className="mt-5" />
          </section>
        ))}
        {editing && (
          <div className="px-5 py-3 sm:px-8">
            <AddButton path={["experience"]} make={() => ({ ...structuredClone(templates.job), roles: [structuredClone(templates.role)] })} label="Add job" />
          </div>
        )}
      </Window>

      <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-12">
        <section aria-labelledby="edu-title">
          <h2 id="edu-title" className="pixel text-5xl">
            <T path={["experiencePage", "educationHeading"]} />
          </h2>
          <ul className="mt-5 space-y-6">
            {c.education.map((e, i) => (
              <li key={i} className="relative border-t border-ink pt-4">
                <ItemTools path={["education"]} index={i} length={c.education.length} noun="school" confirmRemove />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-xl font-semibold">
                    <T path={["education", i, "school"]} />
                  </h3>
                  <p className="font-mono text-sm text-ink-soft">
                    <T path={["education", i, "period"]} />
                  </p>
                </div>
                <p className="mt-1">
                  <T path={["education", i, "degree"]} multiline />
                </p>
                {(e.note || editing) && (
                  <p className="mt-1 text-sm text-ink-soft">
                    <T path={["education", i, "note"]} multiline placeholder="Note (optional)" />
                  </p>
                )}
              </li>
            ))}
          </ul>
          <AddButton path={["education"]} make={() => ({ ...templates.education })} label="Add school" className="mt-5" />
        </section>

        <section aria-labelledby="also-title">
          <h2 id="also-title" className="pixel text-5xl">
            <T path={["experiencePage", "alsoHeading"]} />
          </h2>
          <dl className="mt-5 space-y-3 border-t border-ink pt-4">
            {c.resumeExtras.map((_, i) => (
              <div key={i} className="relative grid gap-0.5 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                <dt className="label sm:pt-0.5">
                  <T path={["resumeExtras", i, "label"]} />
                </dt>
                <dd>
                  <T path={["resumeExtras", i, "value"]} multiline />
                </dd>
                <ItemTools path={["resumeExtras"]} index={i} length={c.resumeExtras.length} noun="row" className="-right-2 top-0 translate-x-full" />
              </div>
            ))}
          </dl>
          <AddButton path={["resumeExtras"]} make={() => ({ ...templates.extra })} label="Add row" className="mt-5" />
        </section>
      </div>
    </div>
  );
}
