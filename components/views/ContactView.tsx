"use client";

import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Window from "@/components/Window";
import Email from "@/components/views/Email";
import {
  AddButton,
  Href,
  ItemTools,
  MediaTools,
  T,
} from "@/components/edit/Editable";
import { useEdit } from "@/components/edit/EditProvider";
import { templates } from "@/lib/content";
import Block from "@/components/edit/Block";

/** /contact: a small about + contact page. Portrait left, words and links right. */
export default function ContactView() {
  const { content: c, editing } = useEdit();
  const photo = c.contactPage.photo;

  return (
    <div className="mx-auto max-w-5xl px-5 pb-20 sm:px-8">
      <PageHeader at="contactPage" />
      <div className="mt-2 grid gap-10 md:grid-cols-12 md:items-start md:gap-14">
        <Block
          id="contact.photo"
          kind="image"
          label="Portrait"
          className="relative mx-auto block w-full max-w-[19rem] md:col-span-5 md:mx-0 md:max-w-none"
        >
          <Window
            title={<T path={["contactPage", "photoTitle"]} />}
            className="win-open"
            bodyClassName="p-2"
          >
            {photo?.src ? (
              <span className="relative block aspect-[4/5] overflow-hidden rounded-[3px] bg-desk">
                <Image
                  src={photo.src}
                  alt={photo.alt || "Charmaine Lai"}
                  fill
                  priority
                  sizes="(min-width: 768px) 380px, 304px"
                  className="object-cover object-[50%_30%]"
                  unoptimized={/^https?:/.test(photo.src)}
                />
              </span>
            ) : (
              <span className="grid aspect-[4/5] place-items-center rounded-[3px] border border-dashed border-ink/40 bg-desk/50 font-mono text-xs text-ink-soft">
                my photo
              </span>
            )}
            <MediaTools path={["contactPage", "photo"]} />
          </Window>
        </Block>

        <div className="md:col-span-7 md:pt-2">
          <Block
            id="contact.about"
            label="About"
            as="p"
            className="max-w-xl text-lg leading-relaxed sm:text-xl"
          >
            <T path={["contactPage", "about"]} multiline />
          </Block>

          <div className="mt-10">
            <p className="label">
              <T path={["contactPage", "emailLabel"]} />
            </p>
            <a
              href={`mailto:${c.site.email}`}
              className="ulink mt-1.5 inline-block text-lg font-semibold sm:text-xl"
            >
              {editing ? (
                <T path={["site", "email"]} placeholder="Email address" />
              ) : (
                <Email email={c.site.email} />
              )}
            </a>
            <div className="mt-5">
              <a href={`mailto:${c.site.email}`} className="btn btn-lime">
                <T path={["contactPage", "button"]} />{" "}
                <span aria-hidden className="arrow">
                  →
                </span>
              </a>
            </div>
          </div>

          <ul className="mt-10 flex flex-wrap gap-2.5">
            {c.contactPage.links.map((l, i) => (
              <li key={i} className="relative">
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink bg-paper px-3.5 py-1.5 text-sm font-semibold transition-colors hover:bg-lime"
                >
                  <T path={["contactPage", "links", i, "label"]} />
                  <span aria-hidden className="text-xs">
                    ↗
                  </span>
                </a>
                <Href path={["contactPage", "links", i, "href"]} />
                <ItemTools
                  path={["contactPage", "links"]}
                  index={i}
                  length={c.contactPage.links.length}
                  noun="link"
                  className="-top-6 right-0"
                />
              </li>
            ))}
            <li>
              <AddButton
                path={["contactPage", "links"]}
                make={() => ({ ...templates.link })}
                label="Add link"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
