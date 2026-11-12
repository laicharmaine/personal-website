"use client";

import Image from "next/image";
import Block, { SortArea, useListMove } from "@/components/edit/Block";
import PageHeader from "@/components/PageHeader";
import Window from "@/components/Window";
import {
  AddButton,
  Href,
  ItemTools,
  MediaTools,
  T,
} from "@/components/edit/Editable";
import { useEdit } from "@/components/edit/EditProvider";
import { templates, type FunItem, type FunMedia } from "@/lib/content";
import type { Path } from "@/lib/path";

function Frame({
  m,
  shape,
  i,
  path,
  small,
}: {
  m: FunMedia;
  shape: FunItem["shape"];
  i: number;
  path: Path;
  small?: boolean;
}) {
  const tilt = i % 2 === 0 ? "-rotate-[1.5deg]" : "rotate-[1.5deg]";
  const remote = Boolean(m.src && /^https?:/.test(m.src));
  const inner = m.src ? (
    <span className={`photo-frame flex h-full min-h-0 flex-col bg-paper p-2 pb-3 ${tilt}`}>
      <span className="relative min-h-0 w-full flex-1 overflow-hidden">
        <Image
          src={m.src}
          alt={m.alt ?? ""}
          fill
          sizes={small ? "128px" : "(min-width: 768px) 500px, 90vw"}
          className="object-cover"
          unoptimized={remote}
        />
      </span>
      {m.caption && (
        <span
          className={`mt-2 block shrink-0 text-center font-mono text-ink-soft ${small ? "text-[0.6rem] leading-tight" : "text-xs"}`}
        >
          <T path={[...path, "caption"]} />
        </span>
      )}
    </span>
  ) : (
    <span className="placeholder-frame grid h-full min-h-0 place-items-center rounded-md border-[1.5px] border-dashed border-ink/40 bg-desk/50 p-3 text-center">
      <span>
        <span aria-hidden className="block text-2xl text-peri-deep">
          {shape === "wide" ? "▶" : "✦"}
        </span>
        <span className="mt-1 block font-mono text-xs text-ink-soft">
          <T path={[...path, "caption"]} placeholder="Caption" />
        </span>
      </span>
    </span>
  );
  return (
    <span className="relative block h-full min-h-0">
      {m.href ? (
        <a
          href={m.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-full min-h-0 flex-col"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
      <MediaTools path={path} />
    </span>
  );
}

export default function FunView() {
  const { content: c, editing } = useEdit();
  const moveFun = useListMove(["fun"]);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <PageHeader at="funPage" />

      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        <SortArea ids={c.fun.map((_, i) => `f${i}`)} onMove={moveFun} grid>
          {c.fun.map((item, idx) => (
            <Block
              key={idx}
              id={`fun.${item.slug || idx}`}
              kind="item"
              sortKey={`f${idx}`}
              label="Card"
              className="h-full"
            >
              <Window
                as="section"
                title={<T path={["fun", idx, "file"]} />}
                tone="peri"
                className={`relative flex h-full flex-col ${idx < 2 ? "win-open" : "win-open-2"}`}
                bodyClassName="flex flex-1 flex-col px-5 pb-6 pt-5 sm:px-7 sm:pb-7"
                labelledBy={`fun-${item.slug}`}
              >
                <ItemTools
                  path={["fun"]}
                  index={idx}
                  length={c.fun.length}
                  noun="card"
                  confirmRemove
                  className="right-10 top-1"
                />
                <div id={item.slug} className="flex flex-1 flex-col scroll-mt-24">
                  <div
                    className={`fun-media grid gap-4 ${
                      item.media.length >= 3
                        ? "grid-cols-3"
                        : item.media.length === 2
                          ? "grid-cols-2"
                          : "grid-cols-1"
                    }`}
                  >
                    {item.media.map((m, i) => (
                      <Block
                        key={i}
                        id={`fun.${item.slug || idx}.media.${i}`}
                        kind="image"
                        label="Photo"
                        as="span"
                        className="relative block h-full min-h-0"
                        sizes={{
                          s: "relative mx-auto block h-full min-h-0 w-[72%]",
                          l: "relative block h-full min-h-0",
                        }}
                      >
                        <Frame
                          m={m}
                          shape={item.shape}
                          i={i}
                          path={["fun", idx, "media", i]}
                        />
                        <ItemTools
                          path={["fun", idx, "media"]}
                          index={i}
                          length={item.media.length}
                          noun="frame"
                          className="-top-3 right-0"
                        />
                      </Block>
                    ))}
                  </div>
                  {editing && (
                    <AddButton
                      path={["fun", idx, "media"]}
                      make={() => ({ ...templates.media })}
                      label="Add frame"
                      className="mt-4"
                    />
                  )}

                  <div className="fun-copy">
                  <h2
                    id={`fun-${item.slug}`}
                    className="pixel text-[2.6rem]"
                  >
                    <T path={["fun", idx, "title"]} />
                  </h2>
                  <p className="fun-stat font-mono text-sm text-ink-soft">
                    {item.stat ? (
                      <>
                        <T path={["fun", idx, "stat", "value"]} />{" "}
                        <T path={["fun", idx, "stat", "label"]} />
                      </>
                    ) : (
                      <span aria-hidden className="invisible">
                        &nbsp;
                      </span>
                    )}
                  </p>
                  <Block
                    id={`fun.${item.slug || idx}.line`}
                    label="Card text"
                    as="p"
                    className="fun-line text-ink-soft"
                  >
                    <T path={["fun", idx, "line"]} multiline />
                  </Block>
                  {(item.links?.length || editing) ? (
                    <p className="fun-links flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                      {item.links?.map((l, j) => (
                        <span key={j} className="relative">
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ulink"
                          >
                            <T path={["fun", idx, "links", j, "label"]} /> ↗
                          </a>
                          <Href path={["fun", idx, "links", j, "href"]} />
                          {editing && (
                            <ItemTools
                              path={["fun", idx, "links"]}
                              index={j}
                              length={item.links!.length}
                              noun="link"
                              className="-top-6 left-0"
                            />
                          )}
                        </span>
                      ))}
                      <AddButton
                        path={["fun", idx, "links"]}
                        make={() => ({ ...templates.link })}
                        label="Add link"
                      />
                    </p>
                  ) : (
                    <p className="fun-links" aria-hidden>
                      &nbsp;
                    </p>
                  )}
                  </div>
                </div>
              </Window>
            </Block>
          ))}
        </SortArea>
      </div>
      <AddButton
        path={["fun"]}
        make={templates.funItem}
        label="Add a card"
        className="mt-8"
      />
    </div>
  );
}
