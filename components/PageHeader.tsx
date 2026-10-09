type Props = {
  /** Playful file-path flavor, shown small above the title. */
  path: string;
  title: string;
  intro?: string;
};

export default function PageHeader({ path, title, intro }: Props) {
  return (
    <header className="pb-10 pt-12 sm:pb-14 sm:pt-16">
      <p className="label">{path}</p>
      <h1 className="pixel pixel-shadow mt-3 text-[5rem] sm:text-[8.5rem]">{title}</h1>
      {intro && <p className="mt-5 max-w-xl text-lg text-ink-soft sm:text-xl">{intro}</p>}
    </header>
  );
}
