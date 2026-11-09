# PeachTech LLC — company website

Next.js 16 (App Router) · Tailwind CSS v4 · Motion (scroll animations) · Nodemailer (job applications). Light mode only, background `#FCE8D4`.

## Getting started

```bash
cp .env.example .env.local   # then fill in contact info + SMTP settings
npm install
npm run dev                  # http://localhost:3000
```

Production: `npm run build && npm start`. Pages are prerendered, so **rebuild after changing `.env`** values.

## Where to edit things

| What | File |
| --- | --- |
| Email, phone, address, socials, site URL | `.env.local` (see `.env.example`) |
| Products and the external URLs they link to | `src/lib/products.ts` |
| Open jobs (titles, salary, dates, skills) | `src/lib/jobs.ts` |
| Services, process, perks, FAQs | `src/lib/content.ts` |
| Colors and fonts | `src/app/globals.css` (`@theme`) |
| Images / logos | `public/images`, `public/brand` |

## Job applications

The apply form (`/careers#apply` and each `/careers/[slug]` page) posts to `src/app/api/apply/route.ts`, which validates the input and emails the application, with the resume attached (PDF/DOC/DOCX, max 5 MB), to `APPLY_TO_EMAIL` (or `CAREERS_EMAIL`) over SMTP. Set `APPLY_SEND_CONFIRMATION=true` to also send the applicant an acknowledgement. It includes a honeypot field and a simple per-IP rate limit.

## SEO and AEO (AI search)

- Per-page titles, descriptions, canonical URLs, Open Graph / Twitter cards, and a generated OG image
- JSON-LD: `Organization`, `WebSite`, `JobPosting` (Google for Jobs) on each role, `FAQPage`, `BreadcrumbList`, `Service` and `SoftwareApplication` lists
- `sitemap.xml`, `robots.txt` (explicitly allows AI crawlers such as GPTBot, ClaudeBot and PerplexityBot), `manifest.webmanifest`
- `/llms.txt`: a plain-markdown summary of the company, jobs and FAQs for AI assistants
- FAQ sections written as direct question-and-answer pairs that answer engines can quote

Keep `datePosted` and `validThrough` in `jobs.ts` current; expired postings are dropped by job search engines. After deploying, submit the sitemap in Google Search Console and Bing Webmaster Tools.

## Image credits

Stock photos from Pexels (Pexels License). They are illustrative and do not depict PeachTech staff or clients.
