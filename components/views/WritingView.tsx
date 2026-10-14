"use client";

import PageHeader from "@/components/PageHeader";
import Window from "@/components/Window";
import { AddButton, Href, ItemTools, T } from "@/components/edit/Editable";
import { useEdit } from "@/components/edit/EditProvider";
import { templates } from "@/lib/content";

export default function WritingView() {
  const { content: c, editing } = useEdit();

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <PageHeader at="writingPage" />
      <Window
        title={<T path={["writingPage", "window"]} />}
        className="win-open"
        bodyClassName="p-0"
      >
        <ul className="divide-y divide-line">
          {c.articles.map((a, i) => (
            <li key={i} className="relative">
              <ItemTools
                path={["articles"]}
                index={i}
                length={c.articles.length}
                noun="article"
                confirmRemove
                className="right-12 top-1"
              />
              <a
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className="file-row grid grid-cols-[1fr_auto] gap-x-5 gap-y-1 px-4 py-5 sm:grid-cols-[4.5rem_1fr_15rem_auto] sm:items-baseline sm:px-7"
              >
                <span className="font-mono text-sm text-ink-soft">
                  <T path={["articles", i, "date"]} />
                </span>
                <span className="col-span-2 text-lg font-semibold sm:col-span-1">
                  <T path={["articles", i, "title"]} multiline />
                  <Href path={["articles", i, "href"]} />
                </span>
                <span className="muted-on-hover text-sm text-ink-soft">
                  <T path={["articles", i, "outlet"]} />
                </span>
                <span
                  aria-hidden
                  className="col-start-2 row-start-1 sm:col-start-4"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
        {editing && (
          <div className="border-t border-line px-4 py-3 sm:px-7">
            <AddButton
              path={["articles"]}
              make={() => ({ ...templates.article })}
              label="Add article"
            />
          </div>
        )}
      </Window>
    </div>
  );
}
