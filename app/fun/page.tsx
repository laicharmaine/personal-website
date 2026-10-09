import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Window from "@/components/Window";
import { fun, type FunItem, type FunMedia } from "@/lib/content";

export const metadata: Metadata = {
  title: "For fun",
  description: "Charmaine Lai off the clock: photography, dance and choreography, arts and crafts, and a famous cat.",
};

const aspect = { portrait: "aspect-[3/4]", wide: "aspect-video", square: "aspect-square" } as const;

function Frame({ m, shape, i }: { m: FunMedia; shape: FunItem["shape"]; i: number }) {
  const tilt = i % 2 === 0 ? "-rotate-[1.5deg]" : "rotate-[1.5deg]";
  const inner = m.src ? (
    <span className={`photo-frame block bg-paper p-2 pb-3 ${tilt}`}>
      <span className={`relative block overflow-hidden ${aspect[shape]}`}>
        <Image src={m.src} alt={m.alt ?? ""} fill sizes="(min-width: 768px) 260px, 45vw" className="object-cover" />
      </span>
      {m.caption && <span className="mt-2 block text-center font-mono text-xs text-ink-soft">{m.caption}</span>}
    </span>
  ) : (
    <span
      className={`placeholder-frame grid place-items-center rounded-md border-[1.5px] border-dashed border-ink/40 bg-desk/50 p-3 text-center ${aspect[shape]}`}
    >
      <span>
        <span aria-hidden className="block text-2xl text-peri-deep">{shape === "wide" ? "▶" : "✦"}</span>
        <span className="mt-1 block font-mono text-xs text-ink-soft">{m.caption ?? "Coming soon"}</span>
      </span>
    </span>
  );
  return m.href ? (
    <a href={m.href} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}

export default function FunPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <PageHeader path="C:\Charmaine\extracurriculars.zip" title="For fun" intro="What I’m up to when the laptop’s closed." />

      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        {fun.map((item, idx) => (
          <Window
            key={item.slug}
            as="section"
            title={item.file}
            tone={item.stat ? "lime" : "peri"}
            className={idx < 2 ? "win-open" : "win-open-2"}
            bodyClassName="px-5 pb-6 pt-5 sm:px-7 sm:pb-7"
            labelledBy={`fun-${item.slug}`}
          >
            <div id={item.slug} className="scroll-mt-24">
              {item.stat ? (
                <div className="grid aspect-[16/7] place-items-center rounded-md bg-ink text-center">
                  <p>
                    <span className="pixel block text-[5.5rem] text-lime sm:text-[6.5rem]">{item.stat.value}</span>
                    <span className="mt-1 block font-mono text-sm text-paper">{item.stat.label}</span>
                  </p>
                </div>
              ) : (
                <div className={`grid gap-4 ${item.media.length >= 3 ? "grid-cols-3" : item.media.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                  {item.media.map((m, i) => (
                    <Frame key={i} m={m} shape={item.shape} i={i} />
                  ))}
                </div>
              )}

              <h2 id={`fun-${item.slug}`} className="pixel mt-6 text-[2.6rem]">{item.title}</h2>
              <p className="mt-2 text-ink-soft">{item.line}</p>
              {item.links && (
                <p className="mt-3 flex flex-wrap gap-x-5 text-sm font-semibold">
                  {item.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="ulink">
                      {l.label} ↗
                    </a>
                  ))}
                </p>
              )}
            </div>
          </Window>
        ))}
      </div>
    </div>
  );
}
