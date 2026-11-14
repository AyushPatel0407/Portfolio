"use client";

import { useState } from "react";

type Props = {
  services: string[];
  email: string;
  linkedin: string;
};

const TIMELINES = ["As soon as possible", "Within a month", "In 1–3 months", "Just exploring"];

/**
 * Lets a visitor write a short project brief. With an email configured it
 * opens their mail app; otherwise it copies the brief and opens LinkedIn.
 */
export default function ProjectBrief({ services, email, linkedin }: Props) {
  const [name, setName] = useState("");
  const [service, setService] = useState(services[0] ?? "");
  const [timeline, setTimeline] = useState(TIMELINES[1]);
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const brief = [
    `Hi Ayush, I'm ${name || "[your name]"}.`,
    "",
    `I need help with: ${service}`,
    `Timeline: ${timeline}`,
    "",
    details || "[A few lines about the project]",
  ].join("\n");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      const subject = encodeURIComponent(`Project enquiry: ${service}`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(brief)}`;
      return;
    }
    try {
      await navigator.clipboard.writeText(brief);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    window.open(linkedin, "_blank", "noopener,noreferrer");
  }

  const field =
    "w-full rounded-xl border border-line bg-background px-4 py-3 text-base outline-none transition-colors focus:border-accent";

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <div className="grid gap-5 lg:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="text-muted">Your name</span>
          <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="Priya Shah" />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="text-muted">Timeline</span>
          <select className={field} value={timeline} onChange={(e) => setTimeline(e.target.value)}>
            {TIMELINES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm">
        <span className="text-muted">What do you need?</span>
        <select className={field} value={service} onChange={(e) => setService(e.target.value)}>
          {services.map((s) => (
            <option key={s}>{s}</option>
          ))}
          <option>Something else</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm">
        <span className="text-muted">Tell me about the project</span>
        <textarea
          className={`${field} min-h-32 resize-y`}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Who will use it, what tools you use today, and what would make this a success."
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {email ? "Send by email" : "Copy brief & open LinkedIn ↗"}
        </button>
        <p className="text-sm text-muted" role="status">
          {status === "copied" && "Brief copied. Paste it into a LinkedIn message."}
          {status === "error" && "Couldn't copy automatically. Select the text above and copy it."}
          {status === "idle" && !email && "Your brief is copied so you can paste it into a message."}
        </p>
      </div>
    </form>
  );
}
