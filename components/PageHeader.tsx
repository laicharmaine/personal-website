"use client";

import { T } from "@/components/edit/Editable";
import Block from "@/components/edit/Block";

type Props = {
  /** Content key of the page copy, e.g. "projectsPage" (has path, title, intro). */
  at:
    | "projectsPage"
    | "experiencePage"
    | "writingPage"
    | "funPage"
    | "contactPage";
};

export default function PageHeader({ at }: Props) {
  return (
    <header className="pb-10 pt-12 sm:pb-14 sm:pt-16">
      <p className="label">
        <T path={[at, "path"]} />
      </p>
      <Block
        id={`${at}.title`}
        label="Page title"
        as="h1"
        className="pixel pixel-shadow mt-3 text-[5rem] sm:text-[8.5rem]"
      >
        <T path={[at, "title"]} />
      </Block>
      <Block
        id={`${at}.intro`}
        label="Page intro"
        as="p"
        className="mt-5 max-w-xl text-lg text-ink-soft sm:text-xl"
      >
        <T path={[at, "intro"]} multiline />
      </Block>
    </header>
  );
}
