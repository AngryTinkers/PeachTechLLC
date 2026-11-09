"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, type FormEvent } from "react";
import { Icon } from "./icons";

const MAX_MB = 4;
const ACCEPT = ".pdf,.doc,.docx";

type Status = { state: "idle" } | { state: "sending" } | { state: "success" } | { state: "error"; message: string };

export function ApplyForm({
  positions,
  defaultPosition = "General application",
}: {
  positions: string[];
  defaultPosition?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [fileName, setFileName] = useState<string>("");
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const file = data.get("resume");
    if (!(file instanceof File) || file.size === 0) {
      setStatus({ state: "error", message: "Please attach your resume (PDF, DOC or DOCX)." });
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setStatus({ state: "error", message: `Your resume must be ${MAX_MB} MB or smaller.` });
      return;
    }

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/apply", { method: "POST", body: data });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      setStatus({ state: "success" });
      form.reset();
      setFileName("");
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  const input =
    "mt-2 w-full rounded-2xl border border-peach-200 bg-cream-50 px-4 py-3 text-ink placeholder:text-ink-muted/60 outline-none transition focus:border-peach-500 focus:ring-4 focus:ring-peach-300/30";
  const label = "text-sm font-semibold text-ink";

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status.state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center rounded-[28px] border border-peach-200 bg-cream-50 p-10 text-center"
            role="status"
          >
            <span className="inline-flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-peach-400 to-peach-600 text-white shadow-lg">
              <Icon name="check" width={30} height={30} />
            </span>
            <h3 className="mt-6 font-display text-3xl font-medium text-ink">Application received!</h3>
            <p className="mt-3 max-w-md text-ink-muted">
              Thank you for applying to PeachTech. Our recruiting team will review your resume and reach out by
              email if there&apos;s a match.
            </p>
            <button
              type="button"
              onClick={() => setStatus({ state: "idle" })}
              className="mt-8 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink hover:border-peach-500"
            >
              Submit another application
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-5 rounded-[28px] border border-peach-200 bg-cream-50/80 p-6 shadow-[0_30px_60px_-40px_rgba(198,58,23,0.5)] sm:grid-cols-2 sm:p-8"
            noValidate={false}
          >
            {/* Honeypot: hidden from people, tempting for bots */}
            <div className="absolute -left-[9999px]" aria-hidden>
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <label className="sm:col-span-2">
              <span className={label}>
                Full name <span className="text-peach-600">*</span>
              </span>
              <input name="fullName" required maxLength={120} autoComplete="name" placeholder="Jane Doe" className={input} />
            </label>
            <label>
              <span className={label}>
                Email <span className="text-peach-600">*</span>
              </span>
              <input
                name="email"
                type="email"
                required
                maxLength={200}
                autoComplete="email"
                placeholder="jane@example.com"
                className={input}
              />
            </label>
            <label>
              <span className={label}>
                Phone number <span className="text-peach-600">*</span>
              </span>
              <input
                name="phone"
                type="tel"
                required
                maxLength={40}
                autoComplete="tel"
                placeholder="+1 555 123 4567"
                pattern="[0-9+()\-.\s]{7,40}"
                className={input}
              />
            </label>
            <label className="sm:col-span-2">
              <span className={label}>Position</span>
              <select name="position" defaultValue={defaultPosition} className={input}>
                {["General application", ...positions].map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
            <label className="sm:col-span-2">
              <span className={label}>LinkedIn, GitHub or portfolio URL</span>
              <input name="profileUrl" type="url" maxLength={300} placeholder="https://" className={input} />
            </label>
            <label className="sm:col-span-2">
              <span className={label}>Anything you&apos;d like us to know?</span>
              <textarea
                name="message"
                rows={4}
                maxLength={3000}
                placeholder="Tell us about a project you're proud of, your availability, preferred time zone…"
                className={input}
              />
            </label>

            <div className="sm:col-span-2">
              <span className={label}>
                Resume / CV <span className="text-peach-600">*</span>
              </span>
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  const f = e.dataTransfer.files?.[0];
                  if (f && fileInput.current) {
                    const dt = new DataTransfer();
                    dt.items.add(f);
                    fileInput.current.files = dt.files;
                    setFileName(f.name);
                  }
                }}
                className={`mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition ${
                  dragging ? "border-peach-500 bg-peach-200/40" : "border-peach-300/80 bg-cream-100/60 hover:border-peach-500"
                }`}
              >
                <Icon name="upload" width={28} height={28} className="text-peach-600" />
                <span className="mt-3 text-sm font-semibold text-ink">
                  {fileName || "Drop your resume here or click to browse"}
                </span>
                <span className="mt-1 text-xs text-ink-muted">PDF, DOC or DOCX · max {MAX_MB} MB</span>
                <input
                  ref={fileInput}
                  type="file"
                  name="resume"
                  accept={ACCEPT}
                  required
                  className="sr-only"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                />
              </label>
            </div>

            <label className="flex items-start gap-3 text-sm text-ink-muted sm:col-span-2">
              <input type="checkbox" name="consent" required className="mt-1 size-4 accent-peach-600" />
              <span>
                I agree that PeachTech LLC may store and use my information to evaluate my application and share it
                with partner companies for relevant roles.
              </span>
            </label>

            <AnimatePresence>
              {status.state === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="alert"
                  className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2"
                >
                  {status.message}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status.state === "sending"}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-peach-600 px-6 py-4 font-semibold text-white shadow-[0_12px_30px_-12px_rgba(236,79,38,0.7)] transition hover:bg-peach-700 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
              >
                {status.state === "sending" ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Sending…
                  </>
                ) : (
                  <>
                    Submit application
                    <Icon name="arrow" width={18} height={18} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
