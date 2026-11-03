import { ReactNode } from "react";

type Props = {
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  tone?: "light" | "dark";
};

/** Section title and short introduction, left-aligned on the shared container. */
const SectionHeader = ({ title, intro, action, tone = "light" }: Props) => {
  const dark = tone === "dark";
  return (
    <header className="mb-14 lg:mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <h2 className={`section-title ${dark ? "!text-white" : ""}`}>{title}</h2>
        {intro ? <p className={`section-lead ${dark ? "!text-white/65" : ""}`}>{intro}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
};

export default SectionHeader;
