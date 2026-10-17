"use client";

import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Window from "@/components/Window";
import { AddButton, Href, ItemTools, T } from "@/components/edit/Editable";
import { useEdit } from "@/components/edit/EditProvider";
import Thumb from "@/components/views/Thumb";
import { templates, type SideProject } from "@/lib/content";
import Block, { SortArea, slugId, useListMove } from "@/components/edit/Block";

/** /projects: a showcase of off-the-clock builds. One feature block per build. */
export default function ProjectsView() {
  const { content: c } = useEdit();
  const move = useListMove(["sideProjects"]);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
      <PageHeader at="projectsPage" />

      <ol className="mt-4 grid gap-20 sm:gap-28">
        <SortArea ids={c.sideProjects.map((_, i) => `s${i}`)} onMove={move}>
          {c.sideProjects.map((sp, i) => (
            <Block
              key={i}
              id={`side.${slugId(sp.title)}`}
              sortKey={`s${i}`}
              kind="item"
              label="Build"
              as="li"
              domId={slugId(sp.title)}
              className="relative scroll-mt-24"
            >
              <ItemTools
                path={["sideProjects"]}
                index={i}
                length={c.sideProjects.length}
                noun="build"
                confirmRemove
                className="right-0 -top-7"
              />
              {i === 0 ? (
                <Window
                  title={`${sp.title.toLowerCase().replace(/[^a-z0-9]+/g, "")}.exe`}
                  className="win-open"
                  bodyClassName="p-5 sm:p-8"
                >
                  <Feature sp={sp} i={i} flip={false} framed />
                </Window>
              ) : (
                <Feature sp={sp} i={i} flip={i % 2 === 1} />
              )}
            </Block>
          ))}
        </SortArea>
      </ol>
      <AddButton
        path={["sideProjects"]}
        make={() => ({ ...templates.sideProject, links: [], tags: [] })}
        label="Add build"
        className="mt-10"
      />

      <p className="mt-24 border-t border-line pt-6 text-center text-ink-soft">
        <Link href="/fun" className="ulink font-semibold text-ink">
          <T path={["projectsPage", "offTitle"]} />
        </Link>
        <span aria-hidden> · </span>
        <T path={["projectsPage", "offLine"]} />
      </p>
    </div>
  );
}

function Feature({
  sp,
  i,
  flip,
  framed,
}: {
  sp: SideProject;
  i: number;
  flip: boolean;
  framed?: boolean;
}) {
  const { editing } = useEdit();
  const cta = sp.links?.[0];
  const tags = sp.tags ?? [];
  return (
    <div
      className={`grid items-center gap-8 md:grid-cols-12 md:gap-12 ${framed ? "" : ""}`}
    >
      <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
        {sp.media?.src || editing ? (
          <Block
            id={`side.${slugId(sp.title)}.media`}
            kind="image"
            label="Picture"
            className="block w-full"
          >
            <Thumb
              m={sp.media}
              path={["sideProjects", i, "media"]}
              title={`${sp.title.toLowerCase().replace(/[^a-z0-9]+/g, "")}.app`}
              big
              bare={framed}
            />
          </Block>
        ) : (
          <Placeholder title={sp.title} tag={tags[0]} />
        )}
      </div>

      <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
        {(tags.length > 0 || editing) && (
          <ul className="flex flex-wrap gap-2">
            {tags.map((_, k) => (
              <li
                key={k}
                className={`relative rounded-full border px-2.5 py-0.5 font-mono text-[0.7rem] ${
                  k === 0
                    ? "border-ink bg-lime text-ink"
                    : "border-line bg-paper/70 text-ink-soft"
                }`}
              >
                <T path={["sideProjects", i, "tags", k]} />
                <ItemTools
                  path={["sideProjects", i, "tags"]}
                  index={k}
                  length={tags.length}
                  noun="tag"
                  className="-top-6 right-0"
                />
              </li>
            ))}
            <li>
              <AddButton
                path={["sideProjects", i, "tags"]}
                make={() => "New tag"}
                label="Add tag"
              />
            </li>
          </ul>
        )}
        <Block
          id={`side.${slugId(sp.title)}.title`}
          label="Title"
          as="h2"
          className="pixel mt-4 text-6xl sm:text-7xl"
        >
          <T path={["sideProjects", i, "title"]} />
        </Block>
        <Block
          id={`side.${slugId(sp.title)}.line`}
          label="Pitch"
          as="p"
          className="mt-2 max-w-md text-lg"
        >
          <T path={["sideProjects", i, "line"]} multiline />
        </Block>
        {(sp.points?.length || editing) && (
          <ul className="mt-4 grid max-w-md gap-1.5 text-ink-soft">
            {sp.points?.slice(0, 2).map((_, k) => (
              <li key={k} className="relative flex gap-2.5">
                <span aria-hidden className="text-peri-deep">
                  ✦
                </span>
                <span>
                  <T path={["sideProjects", i, "points", k]} multiline />
                </span>
                <ItemTools
                  path={["sideProjects", i, "points"]}
                  index={k}
                  length={sp.points!.length}
                  noun="point"
                  className="-top-5 right-0"
                />
              </li>
            ))}
            {(sp.points?.length ?? 0) < 2 && (
              <li>
                <AddButton
                  path={["sideProjects", i, "points"]}
                  make={() => "New point"}
                  label="Add point"
                />
              </li>
            )}
          </ul>
        )}
        {cta ? (
          <p className="relative mt-7">
            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lime"
            >
              <T path={["sideProjects", i, "links", 0, "label"]} />{" "}
              <span aria-hidden className="arrow">
                ↗
              </span>
            </a>
            <Href path={["sideProjects", i, "links", 0, "href"]} />
          </p>
        ) : (
          editing && (
            <AddButton
              path={["sideProjects", i, "links"]}
              make={() => ({ ...templates.link })}
              label="Add button link"
              className="mt-6"
            />
          )
        )}
      </div>
    </div>
  );
}

/** For builds without a screenshot (e.g. private tools): a calm framed card. */
function Placeholder({ title, tag }: { title: string; tag?: string }) {
  return (
    <div className="thumb-win overflow-hidden rounded-[6px] border border-ink bg-paper shadow-[3px_3px_0_var(--peri)]">
      <div
        aria-hidden
        className="flex h-6 items-center gap-1 border-b border-ink bg-peri/60 px-2.5"
      >
        <span className="h-1.5 w-1.5 rounded-full border border-ink bg-paper" />
        <span className="h-1.5 w-1.5 rounded-full border border-ink bg-paper" />
        <span className="ml-1 font-mono text-[0.7rem] text-ink">
          {title.toLowerCase().replace(/[^a-z0-9]+/g, "")}.app
        </span>
      </div>
      <div className="relative grid aspect-[16/10] grid-cols-[5.5rem_1fr] gap-3 bg-desk/40 p-4 sm:grid-cols-[7rem_1fr] sm:p-6">
        <div aria-hidden className="grid content-start gap-2">
          {[70, 55, 80, 45, 60].map((w, k) => (
            <span
              key={k}
              className="h-2 rounded-full bg-peri/30"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
        <div aria-hidden className="grid grid-cols-7 content-start gap-1.5">
          {Array.from({ length: 28 }, (_, k) => (
            <span
              key={k}
              className={`aspect-square rounded-[3px] border ${k === 9 ? "border-ink bg-lime" : [3, 15, 22].includes(k) ? "border-peri bg-peri/25" : "border-line bg-paper/70"}`}
            />
          ))}
        </div>
        <div className="col-span-2 self-end">
          <p className="pixel text-4xl sm:text-5xl">{title}</p>
          {tag && (
            <p className="mt-1 font-mono text-xs text-ink-soft">
              🔒 {tag.toLowerCase()} build, screenshots stay private
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
