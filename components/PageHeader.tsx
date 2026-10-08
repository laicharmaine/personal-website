type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
};

export default function PageHeader({ eyebrow, title, intro }: Props) {
  return (
    <header className="pb-12 pt-14 sm:pb-16 sm:pt-20">
      <p className="label fade-up">{eyebrow}</p>
      <h1 className="display fade-up fade-up-1 mt-4 text-[4.5rem] sm:text-[8rem]">{title}</h1>
      {intro && (
        <p className="fade-up fade-up-2 mt-6 max-w-xl text-lg text-muted sm:text-xl">{intro}</p>
      )}
    </header>
  );
}
