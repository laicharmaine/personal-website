"use client";

import Link from "next/link";
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

export default function ProjectsView() {
  const { content: c, editing } = useEdit();
  const moveSide = useListMove(["sideProjects"]);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <PageHeader at="projectsPage" />
      <Sections
        page="projects"
        items={[
          {
            id: "projects.side",
            node: (
              <Block
                id="projects.side"
                kind="section"
                label="Side projects"
                as="section"
                className="pt-4"
                aria-labelledby="side-title"
              >
                <h2 id="side-title" className="pixel text-5xl sm:text-6xl">
                  <T path={["projectsPage", "sideHeading"]} />
                </h2>
                <ul className="mt-8 grid gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
                  <SortArea
                    ids={c.sideProjects.map((_, i) => `s${i}`)}
                    onMove={moveSide}
                    grid
                  >
                    {c.sideProjects.map((sp, i) => (
                      <Block
                        key={i}
                        id={`side.${slugId(sp.title)}`}
                        sortKey={`s${i}`}
                        kind="item"
                        label="Side project"
                        as="li"
                        className="relative border-t border-ink pt-5"
                      >
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
                            <Block
                              id={`side.${slugId(sp.title)}.media`}
                              kind="image"
                              label="Picture"
                              className="block w-full max-w-[13rem]"
                              sizes={{
                                s: "block w-full max-w-[9rem]",
                                l: "block w-full max-w-[18rem]",
                              }}
                            >
                              <Thumb
                                m={sp.media}
                                path={["sideProjects", i, "media"]}
                                title={sp.title.toLowerCase() + ".app"}
                              />
                            </Block>
                          </div>
                        )}
                        <p className="mt-2 text-ink-soft">
                          <T path={["sideProjects", i, "line"]} multiline />
                        </p>
                        {(sp.points?.length || editing) && (
                          <ul className="mt-2 grid gap-1 text-sm text-ink-soft">
                            {sp.points?.map((_, k) => (
                              <li key={k} className="relative flex gap-2">
                                <span aria-hidden>✦</span>
                                <span>
                                  <T
                                    path={["sideProjects", i, "points", k]}
                                    multiline
                                  />
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
                            <li>
                              <AddButton
                                path={["sideProjects", i, "points"]}
                                make={() => "New point"}
                                label="Add point"
                              />
                            </li>
                          </ul>
                        )}
                        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                          {sp.links?.map((l, j) => (
                            <span key={j} className="relative">
                              <a
                                href={l.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ulink"
                              >
                                <T
                                  path={[
                                    "sideProjects",
                                    i,
                                    "links",
                                    j,
                                    "label",
                                  ]}
                                />{" "}
                                ↗
                              </a>
                              <Href
                                path={["sideProjects", i, "links", j, "href"]}
                              />
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
                      </Block>
                    ))}
                  </SortArea>
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
              </Block>
            ),
          },
        ]}
      />
    </div>
  );
}
