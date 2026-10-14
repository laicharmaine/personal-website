"use client";

import Image from "next/image";
import Link from "next/link";
import Window from "@/components/Window";
import {
  AddButton,
  ItemTools,
  MediaTools,
  T,
} from "@/components/edit/Editable";
import Email from "@/components/views/Email";
import { useEdit } from "@/components/edit/EditProvider";
import { templates } from "@/lib/content";
import Block, { Sections } from "@/components/edit/Block";

export default function HomeView() {
  const { content: c, editing } = useEdit();
  const [first, ...rest] = c.site.name.split(" ");

  const hero = (
    <Block
      id="home.hero"
      kind="section"
      label="Intro window"
      as="section"
      className="mx-auto max-w-6xl px-5 pt-12 sm:px-8 sm:pt-16"
      aria-labelledby="hero-title"
    >
      <div className="relative">
        <Window
          title={<T path={["home", "windowTitle"]} />}
          className="win-open"
          bodyClassName="px-5 pb-8 pt-7 sm:px-10 sm:pb-12 sm:pt-10"
        >
          <h1
            id="hero-title"
            className="pixel pixel-shadow whitespace-nowrap text-[20vw] md:text-[min(12.5vw,10.5rem)]"
          >
            {editing ? (
              <T path={["site", "name"]} />
            ) : (
              <>
                {first}
                {rest.length > 0 && (
                  <>
                    <br className="md:hidden" /> {rest.join(" ")}
                  </>
                )}
              </>
            )}
            <span
              aria-hidden
              className="blink ml-[0.08em] inline-block h-[0.55em] w-[0.2em] bg-lime align-baseline outline outline-[1.5px] outline-ink"
            />
          </h1>
          <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
            <Block
              id="home.hook"
              label="Tagline"
              as="p"
              className="text-2xl font-semibold leading-snug sm:text-[2rem] md:col-span-6"
            >
              <T path={["home", "hookA"]} />{" "}
              <span className="hl">
                <T path={["home", "hookB"]} />
              </span>
            </Block>
            <div className="flex items-end gap-5 sm:gap-7 md:col-span-6">
              <div className="min-w-0 flex-1">
                <Block
                  id="home.intro"
                  label="Intro"
                  as="p"
                  className="max-w-md text-lg text-ink-soft"
                >
                  <T path={["home", "intro"]} multiline />
                </Block>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/projects" className="btn btn-lime">
                    <T path={["home", "ctaWork"]} />{" "}
                    <span aria-hidden className="arrow">
                      →
                    </span>
                  </Link>
                  <a href={`mailto:${c.site.email}`} className="btn btn-paper">
                    <T path={["home", "ctaEmail"]} />
                  </a>
                </div>
              </div>
              {(c.home.photo?.src || editing) && (
                <Block
                  id="home.photo"
                  kind="image"
                  label="My photo"
                  as="span"
                  className="relative block w-24 shrink-0 self-start sm:w-32 md:self-end lg:w-36"
                  sizes={{
                    s: "relative block w-20 shrink-0 self-start sm:w-24 md:self-end lg:w-28",
                    l: "relative block w-28 shrink-0 self-start sm:w-40 md:self-end lg:w-48",
                  }}
                >
                  {c.home.photo?.src ? (
                    <span className="photo-frame block rotate-[2.5deg] bg-paper p-1.5 pb-4">
                      <span className="relative block aspect-[3/4] overflow-hidden">
                        <Image
                          src={c.home.photo.src}
                          alt={c.home.photo.alt ?? ""}
                          fill
                          sizes="(min-width: 1024px) 144px, (min-width: 640px) 128px, 96px"
                          className="object-cover"
                          unoptimized={/^https?:/.test(c.home.photo.src)}
                        />
                      </span>
                    </span>
                  ) : (
                    <span className="placeholder-frame grid aspect-[3/4] place-items-center rounded-md border-[1.5px] border-dashed border-ink/40 bg-desk/50 font-mono text-xs text-ink-soft">
                      my photo
                    </span>
                  )}
                  <MediaTools path={["home", "photo"]} />
                </Block>
              )}
            </div>
          </div>
        </Window>

        {/* Starburst sticker */}
        <div
          className="sticker absolute -right-2 -top-9 sm:-right-7 sm:-top-12"
          aria-hidden={!editing}
        >
          <div className="burst grid h-24 w-24 place-items-center bg-ink sm:h-36 sm:w-36">
            <div className="burst grid h-[5.6rem] w-[5.6rem] place-items-center bg-lime text-center sm:h-[8.5rem] sm:w-[8.5rem]">
              <span className="pixel whitespace-pre-line text-[1.15rem] leading-[0.95] sm:text-[1.75rem]">
                <T path={["home", "sticker"]} multiline />
              </span>
            </div>
          </div>
        </div>
        <p className="sr-only">{c.home.sticker.replace(/\n/g, " ")}</p>
      </div>
    </Block>
  );

  const numbers = (
    <Block
      id="home.numbers"
      kind="section"
      label="Big numbers"
      as="section"
      aria-label="Highlights"
      className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-24"
    >
      <ul className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
        {c.home.proof.map((p, i) => (
          <li
            key={i}
            className={`relative border-line ${i % 2 === 1 ? "border-l pl-5" : "pr-5"} md:px-7 ${i === 0 ? "md:pl-0" : ""} ${
              i === 2 ? "md:border-l" : ""
            }`}
          >
            <ItemTools
              path={["home", "proof"]}
              index={i}
              length={c.home.proof.length}
              noun="number"
            />
            <span className="pixel pixel-shadow block text-[4.5rem] sm:text-[6rem]">
              <T path={["home", "proof", i, "value"]} />
            </span>
            <span className="mt-2 block text-[0.95rem] font-medium text-ink-soft">
              <T path={["home", "proof", i, "label"]} />
            </span>
          </li>
        ))}
      </ul>
      <AddButton
        path={["home", "proof"]}
        make={() => ({ ...templates.stat })}
        label="Add a number"
        className="mt-6"
      />
    </Block>
  );

  const ticker = (
    <Block
      id="home.ticker"
      kind="section"
      label="Skills ticker"
      noWidth
      className="marquee mt-16 overflow-hidden bg-ink py-3 text-lime sm:mt-24"
      aria-label="What I bring"
    >
      {editing ? (
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-y-3 px-5 sm:px-8">
          {c.home.strengths.map((s, i) => (
            <span key={i} className="relative flex items-center">
              <span className="pixel px-4 text-[2rem] leading-none">
                <T path={["home", "strengths", i]} />
              </span>
              <ItemTools
                path={["home", "strengths"]}
                index={i}
                length={c.home.strengths.length}
                noun="skill"
                className="-top-4 right-0"
              />
              <span aria-hidden className="text-peri">
                ✦
              </span>
            </span>
          ))}
          <AddButton
            path={["home", "strengths"]}
            make={() => templates.strength}
            label="Add skill"
            className="ml-4"
          />
        </div>
      ) : (
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="flex flex-none items-center"
              aria-hidden={copy === 1 ? true : undefined}
            >
              {c.home.strengths.map((s, i) => (
                <li key={i} className="flex items-center whitespace-nowrap">
                  <span className="pixel px-6 text-[2rem] leading-none">
                    {s}
                  </span>
                  <span aria-hidden className="text-peri">
                    ✦
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      )}
    </Block>
  );

  const work = (
    <Block
      id="home.work"
      kind="section"
      label="Selected work"
      as="section"
      className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-24"
      aria-labelledby="work-title"
    >
      <div className="mb-5 flex items-end justify-between gap-4">
        <h2 id="work-title" className="pixel text-5xl sm:text-6xl">
          <T path={["home", "workHeading"]} />
        </h2>
        <Link href="/projects" className="ulink text-sm font-semibold">
          <T path={["home", "workAll"]} />
        </Link>
      </div>
      <Window title={<T path={["home", "workWindow"]} />} bodyClassName="p-0">
        <ol className="divide-y divide-line">
          {c.projects.map((p, i) => (
            <li key={i}>
              <Link
                href={`/projects#${p.slug}`}
                className="file-row grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-3 px-4 py-5 sm:grid-cols-[3rem_1fr_1fr_auto] sm:gap-x-6 sm:px-6"
              >
                <span className="font-mono text-sm text-ink-soft">{`0${i + 1}`}</span>
                <span className="text-lg font-semibold sm:text-xl">
                  <T path={["projects", i, "title"]} />
                </span>
                <span className="muted-on-hover col-start-2 mt-0.5 text-ink-soft sm:col-start-3 sm:mt-0">
                  <T path={["projects", i, "line"]} />
                </span>
                <span
                  aria-hidden
                  className="arrow col-start-3 row-start-1 sm:col-start-4"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Window>
      <Link
        href="/fun"
        className="group mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg"
      >
        <span
          aria-hidden
          className="holo h-5 w-5 rounded-[4px] border-[1.5px] border-ink transition-transform duration-300 group-hover:rotate-12"
        />
        <span className="font-semibold">
          <T path={["home", "funLead"]} />
        </span>
        <span className="text-ink-soft group-hover:text-ink">
          <T path={["home", "funText"]} />
        </span>
        <span aria-hidden className="arrow">
          →
        </span>
      </Link>
    </Block>
  );

  const cta = (
    <Block
      id="home.cta"
      kind="section"
      label="Say hi"
      as="section"
      className="mx-auto max-w-6xl px-5 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-28"
      aria-labelledby="cta-title"
    >
      <Block
        id="home.ctaHeading"
        label="Big heading"
        as="h2"
        className="pixel chrome-text text-[5.5rem] drop-shadow-[3px_3px_0_var(--peri)] sm:text-[10rem]"
      >
        <T path={["home", "ctaHeading"]} />
      </Block>
      <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
        <a
          href={`mailto:${c.site.email}`}
          className="ulink text-lg font-semibold sm:text-2xl"
        >
          {editing ? (
            <T path={["site", "email"]} placeholder="Email address" />
          ) : (
            <Email email={c.site.email} />
          )}
        </a>
        <Link href="/experience" className="btn btn-paper">
          <T path={["home", "resume"]} />{" "}
          <span aria-hidden className="arrow">
            →
          </span>
        </Link>
      </div>
    </Block>
  );

  return (
    <Sections
      page="home"
      items={[
        { id: "home.hero", node: hero },
        { id: "home.numbers", node: numbers },
        { id: "home.ticker", node: ticker },
        { id: "home.work", node: work },
        { id: "home.cta", node: cta },
      ]}
    />
  );
}
