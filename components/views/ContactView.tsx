"use client";

import PageHeader from "@/components/PageHeader";
import Window from "@/components/Window";
import Email from "@/components/views/Email";
import { AddButton, Href, ItemTools, T } from "@/components/edit/Editable";
import { useEdit } from "@/components/edit/EditProvider";
import { templates } from "@/lib/content";
import Image from "next/image";
import Block from "@/components/edit/Block";
import { MediaTools } from "@/components/edit/Editable";

export default function ContactView() {
  const { content: c, editing } = useEdit();

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <PageHeader at="contactPage" />
      <div className="grid gap-10 md:grid-cols-12 md:items-start">
        <Window
          title={<T path={["contactPage", "window"]} />}
          tone="lime"
          className="win-open md:col-span-7"
          bodyClassName="px-5 py-8 sm:px-8 sm:py-10"
        >
          <p className="label">
            <T path={["contactPage", "emailLabel"]} />
          </p>
          <a
            href={`mailto:${c.site.email}`}
            className="ulink mt-2 inline-block text-xl font-semibold sm:text-[1.65rem]"
          >
            {editing ? (
              <T path={["site", "email"]} placeholder="Email address" />
            ) : (
              <Email email={c.site.email} />
            )}
          </a>
          <a href={`mailto:${c.site.email}`} className="btn btn-lime mt-8">
            <T path={["contactPage", "button"]} />{" "}
            <span aria-hidden className="arrow">
              →
            </span>
          </a>
        </Window>
        <div className="md:col-span-5">
          <ul className="divide-y divide-line border-y border-ink">
            {c.contactPage.links.map((l, i) => (
              <li key={i} className="relative">
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="file-row flex items-center justify-between px-2 py-4 text-lg font-semibold"
                >
                  <span>
                    <T path={["contactPage", "links", i, "label"]} />
                    <Href path={["contactPage", "links", i, "href"]} />
                  </span>
                  <span aria-hidden>↗</span>
                </a>
                <ItemTools
                  path={["contactPage", "links"]}
                  index={i}
                  length={c.contactPage.links.length}
                  noun="link"
                  className="right-8 top-1"
                />
              </li>
            ))}
          </ul>
          <AddButton
            path={["contactPage", "links"]}
            make={() => ({ ...templates.link })}
            label="Add link"
            className="mt-4"
          />
          {(c.contactPage.photo?.src || editing) && (
            <Block
              id="contact.photo"
              kind="image"
              label="My photo"
              as="span"
              className="relative mt-10 ml-auto mr-4 block w-28 sm:w-32 lg:w-36"
              sizes={{
                s: "relative mt-10 ml-auto mr-4 block w-20 sm:w-24 lg:w-28",
                l: "relative mt-10 ml-auto mr-4 block w-32 sm:w-40 lg:w-48",
              }}
            >
              {c.contactPage.photo?.src ? (
                <span className="photo-frame block rotate-[2.5deg] bg-paper p-1.5 pb-4">
                  <span className="relative block aspect-[3/4] overflow-hidden">
                    <Image
                      src={c.contactPage.photo.src}
                      alt={c.contactPage.photo.alt || "Charmaine Lai"}
                      fill
                      sizes="(min-width: 1024px) 144px, (min-width: 640px) 128px, 96px"
                      className="object-cover"
                      unoptimized={/^https?:/.test(c.contactPage.photo.src)}
                    />
                  </span>
                </span>
              ) : (
                <span className="placeholder-frame grid aspect-[3/4] place-items-center rounded-md border-[1.5px] border-dashed border-ink/40 bg-desk/50 font-mono text-xs text-ink-soft">
                  my photo
                </span>
              )}
              <MediaTools path={["contactPage", "photo"]} />
            </Block>
          )}
        </div>
      </div>
    </div>
  );
}
