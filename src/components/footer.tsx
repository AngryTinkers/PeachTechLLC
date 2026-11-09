import Image from "next/image";
import Link from "next/link";
import { formattedAddress, nav, site, telHref } from "@/lib/site";
import { jobs } from "@/lib/jobs";
import { Icon } from "./icons";

export function Footer() {
  const address = formattedAddress();
  const socials = [
    { href: site.social.linkedin, label: "LinkedIn", icon: "linkedin" as const },
    { href: site.social.github, label: "GitHub", icon: "github" as const },
    { href: site.social.x, label: "X", icon: "x" as const },
  ].filter((s) => s.href);

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-peach-200/70 bg-cream-100/60">
      <div className="pointer-events-none absolute -right-24 -bottom-24 opacity-[0.07]">
        <Image src="/brand/logo.png" alt="" width={420} height={420} />
      </div>
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Image src="/brand/logo-label.png" alt="PeachTech LLC" width={185} height={60} className="h-14 w-auto" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
            {site.legalName} is an AI-first software development agency building intelligent web services and
            connecting great engineers with the technology companies we partner with.
          </p>
          {socials.length > 0 && (
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-peach-200 text-ink-soft transition hover:border-peach-500 hover:text-peach-600"
                >
                  <Icon name={s.icon} />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <h2 className="text-xs font-semibold tracking-[0.2em] text-peach-700 uppercase">Company</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-ink-soft hover:text-peach-600">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-xs font-semibold tracking-[0.2em] text-peach-700 uppercase">Open roles</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {jobs.map((j) => (
              <li key={j.slug}>
                <Link href={`/careers/${j.slug}`} className="text-ink-soft hover:text-peach-600">
                  {j.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <address className="space-y-3 text-sm not-italic md:col-span-3">
          <h2 className="text-xs font-semibold tracking-[0.2em] text-peach-700 uppercase">Get in touch</h2>
          <a href={`mailto:${site.contact.email}`} className="flex items-center gap-2 text-ink-soft hover:text-peach-600">
            <Icon name="mail" width={16} height={16} /> {site.contact.email}
          </a>
          <a href={telHref(site.contact.phone)} className="flex items-center gap-2 text-ink-soft hover:text-peach-600">
            <Icon name="phone" width={16} height={16} /> {site.contact.phone}
          </a>
          {address && (
            <p className="flex items-start gap-2 text-ink-soft">
              <Icon name="pin" width={16} height={16} className="mt-0.5 shrink-0" /> {address}
            </p>
          )}
        </address>
      </div>
      <div className="border-t border-peach-200/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.foundingYear} {site.legalName}. All rights reserved.
          </p>
          <p>Stock photography via Pexels; images are illustrative and do not depict PeachTech staff or clients.</p>
        </div>
      </div>
    </footer>
  );
}
