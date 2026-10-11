"use client";

import { T } from "@/components/edit/Editable";

type Props = {
  /** Content key of the page copy, e.g. "projectsPage" (has path, title, intro). */
  at: "projectsPage" | "experiencePage" | "writingPage" | "funPage" | "contactPage";
};

export default function PageHeader({ at }: Props) {
  return (
    <header className="pb-10 pt-12 sm:pb-14 sm:pt-16">
      <p className="label">
        <T path={[at, "path"]} />
      </p>
      <h1 className="pixel pixel-shadow mt-3 text-[5rem] sm:text-[8.5rem]">
        <T path={[at, "title"]} />
      </h1>
      <p className="mt-5 max-w-xl text-lg text-ink-soft sm:text-xl">
        <T path={[at, "intro"]} multiline />
      </p>
    </header>
  );
}
