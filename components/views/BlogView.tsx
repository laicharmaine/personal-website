"use client";

import PageHeader from "@/components/PageHeader";
import Window from "@/components/Window";
import { AddButton, Href, ItemTools, T } from "@/components/edit/Editable";
import { useEdit } from "@/components/edit/EditProvider";
import { defaultContent, templates, type Article } from "@/lib/content";

export default function BlogView() {
  const { content: c, editing } = useEdit();

  const liveHrefs = new Set(c.articles.map((a) => a.href));
  // Staged seed entries (e.g. newly found Numenta posts) are shown on this
  // page but are NOT merged into editor state, so saving in /admin cannot
  // write them to the shared Blob until Charmaine confirms the list.
  const staged = defaultContent.articles.filter((a) => !liveHrefs.has(a.href));

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
            <ArticleRow
              key={`live-${i}`}
              article={a}
              index={i}
              length={c.articles.length}
              editable
              editing={editing}
            />
          ))}
          {staged.map((a) => (
            <ArticleRow
              key={`staged-${a.href}`}
              article={a}
              index={-1}
              length={0}
              editable={false}
              editing={false}
            />
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

function ArticleRow({
  article,
  index,
  length,
  editable,
  editing,
}: {
  article: Article;
  index: number;
  length: number;
  editable: boolean;
  editing: boolean;
}) {
  return (
    <li className="relative">
      {editable && (
        <ItemTools
          path={["articles"]}
          index={index}
          length={length}
          noun="article"
          confirmRemove
          className="right-12 top-1"
        />
      )}
      <a
        href={article.href}
        target="_blank"
        rel="noopener noreferrer"
        className="file-row grid grid-cols-[1fr_auto] gap-x-5 gap-y-1 px-4 py-5 sm:grid-cols-[4.5rem_1fr_15rem_auto] sm:items-baseline sm:px-7"
      >
        <span className="font-mono text-sm text-ink-soft">
          {editable ? <T path={["articles", index, "date"]} /> : article.date}
        </span>
        <span className="col-span-2 sm:col-span-1">
          <span className="block text-lg font-semibold">
            {editable ? (
              <T path={["articles", index, "title"]} multiline />
            ) : (
              article.title
            )}
            {editable && <Href path={["articles", index, "href"]} />}
          </span>
          {(article.summary || (editable && editing)) && (
            <span className="mt-1 block text-sm font-normal text-ink-soft">
              {editable ? (
                <T path={["articles", index, "summary"]} multiline />
              ) : (
                article.summary
              )}
            </span>
          )}
        </span>
        <span className="muted-on-hover text-sm text-ink-soft">
          {editable ? <T path={["articles", index, "outlet"]} /> : article.outlet}
        </span>
        <span
          aria-hidden
          className="col-start-2 row-start-1 sm:col-start-4"
        >
          ↗
        </span>
      </a>
    </li>
  );
}
