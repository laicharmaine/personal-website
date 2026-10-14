"use client";

import Image from "next/image";
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

const aspect = {
  portrait: "aspect-[3/4]",
  wide: "aspect-video",
  square: "aspect-square",
} as const;

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
    <span className={`photo-frame block bg-paper p-2 pb-3 ${tilt}`}>
      <span className={`relative block overflow-hidden ${aspect[shape]}`}>
        <Image
          src={m.src}
          alt={m.alt ?? ""}
          fill
          sizes={small ? "128px" : "(min-width: 768px) 260px, 45vw"}
          className="object-cover"
          unoptimized={remote}
        />
      </span>
      {m.caption && (
        <span
          className={`mt-2 block text-center font-mono text-ink-soft ${small ? "text-[0.6rem] leading-tight" : "text-xs"}`}
        >
          <T path={[...path, "caption"]} />
        </span>
      )}
    </span>
  ) : (
    <span
      className={`placeholder-frame grid place-items-center rounded-md border-[1.5px] border-dashed border-ink/40 bg-desk/50 p-3 text-center ${aspect[shape]}`}
    >
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
    <span className="relative block">
      {m.href ? (
        <a
          href={m.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
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

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <PageHeader at="funPage" />

      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        {c.fun.map((item, idx) => (
          <Window
            key={idx}
            as="section"
            title={<T path={["fun", idx, "file"]} />}
            tone={item.stat ? "lime" : "peri"}
            className={`relative ${idx < 2 ? "win-open" : "win-open-2"}`}
            bodyClassName="px-5 pb-6 pt-5 sm:px-7 sm:pb-7"
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
            <div id={item.slug} className="scroll-mt-24">
              {item.stat ? (
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="grid aspect-[16/7] min-w-0 flex-1 place-items-center rounded-md bg-ink text-center">
                    <p>
                      <span className="pixel block text-[5.5rem] text-lime sm:text-[6.5rem]">
                        <T path={["fun", idx, "stat", "value"]} />
                      </span>
                      <span className="mt-1 block font-mono text-sm text-paper">
                        <T path={["fun", idx, "stat", "label"]} />
                      </span>
                    </p>
                  </div>
                  {item.media[0] ? (
                    <span className="relative block w-28 shrink-0 sm:w-32">
                      <Frame
                        m={item.media[0]}
                        shape="square"
                        i={1}
                        path={["fun", idx, "media", 0]}
                        small
                      />
                    </span>
                  ) : (
                    editing && (
                      <AddButton
                        path={["fun", idx, "media"]}
                        make={() => ({ ...templates.media })}
                        label="Add photo"
                      />
                    )
                  )}
                </div>
              ) : (
                <>
                  <div
                    className={`grid gap-4 ${
                      item.media.length >= 3
                        ? "grid-cols-3"
                        : item.media.length === 2
                          ? "grid-cols-2"
                          : "grid-cols-1"
                    }`}
                  >
                    {item.media.map((m, i) => (
                      <span key={i} className="relative block">
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
                      </span>
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
                </>
              )}

              <h2 id={`fun-${item.slug}`} className="pixel mt-6 text-[2.6rem]">
                <T path={["fun", idx, "title"]} />
              </h2>
              <p className="mt-2 text-ink-soft">
                <T path={["fun", idx, "line"]} multiline />
              </p>
              {(item.links?.length || editing) && (
                <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
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
              )}
            </div>
          </Window>
        ))}
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
