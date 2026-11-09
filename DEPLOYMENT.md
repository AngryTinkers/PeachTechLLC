# Deploying to Vercel with a GoDaddy domain

**Setup:** GitHub (code) → Vercel (hosting, HTTPS, CI/CD) ← GoDaddy (DNS for your domain)

GoDaddy keeps the domain registration; you only add DNS records that point the domain at Vercel. **Do not** use GoDaddy's "Forwarding" feature. It redirects visitors through GoDaddy's servers, hurts SEO, and breaks HTTPS.

Replace `yourdomain.com` below with your real domain.

> **Vercel plan:** the free Hobby plan is for personal, non-commercial use only. A company website for PeachTech LLC counts as commercial, so use the **Pro** plan (check current pricing on vercel.com/pricing).

---

## 1. Push the latest code

```bash
git add -A
git commit -m "Add CI workflow and deployment guide"
git push origin main
```

## 2. Create the Vercel project

1. Go to https://vercel.com/signup and choose **Continue with GitHub**.
2. **Add New… → Project → Import** the `PeachTechLLC` repository. If it isn't listed, click *Adjust GitHub App Permissions* and grant access to the repo.
3. Vercel detects **Next.js** automatically. Leave Root Directory, build command and output settings at their defaults.
4. Open **Environment Variables** and add the values from `.env.example`:

   | Name | Example value |
   | --- | --- |
   | `SITE_URL` | `https://yourdomain.com` (**important for SEO**) |
   | `CONTACT_EMAIL` | `hello@yourdomain.com` |
   | `CAREERS_EMAIL` | `careers@yourdomain.com` |
   | `CONTACT_PHONE` | `+1 (555) 123-4567` |
   | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` | see step 6 |
   | `APPLY_TO_EMAIL` | inbox that receives applications |
   | `APPLY_SEND_CONFIRMATION` | `true` or `false` |

   Optional: `COMPANY_STREET`, `COMPANY_CITY`, `COMPANY_REGION`, `COMPANY_POSTAL_CODE`, `COMPANY_COUNTRY`, `SOCIAL_LINKEDIN`, `SOCIAL_GITHUB`, `SOCIAL_X`.

5. Click **Deploy**. After about a minute you get a URL like `peachtechllc.vercel.app`. Open it and check the site.

## 3. Add your domain in Vercel

1. Go to **Project → Settings → Domains → Add** and enter `yourdomain.com`.
2. When Vercel offers it, also add `www.yourdomain.com` and set it to **redirect to `yourdomain.com`** (308). One canonical host is better for SEO.
3. Vercel shows **"Invalid Configuration"** along with the exact DNS records it wants. Keep this page open.

## 4. Point GoDaddy DNS to Vercel

1. Sign in at godaddy.com → **My Products** → next to your domain, click **DNS** (or *Manage DNS*).
2. **A record for the root (`@`):**
   - Edit the existing `A @` record (often "Parked") and set its value to the IP shown in Vercel. At the time of writing that's `76.76.21.21` or `216.198.79.1`; **use whatever Vercel shows you**.
   - Delete any other `A` records named `@`, and any `AAAA` records named `@`.
3. **CNAME record for `www`:**
   - Edit the `CNAME www` record (it often points to `@`) and set its value to what Vercel shows, for example `cname.vercel-dns.com`.
4. TTL: 600 seconds or 1 hour is fine.
5. **Don't touch `MX` or `TXT` records.** They run your email.
6. If **Forwarding** is turned on for the domain in GoDaddy, remove it.

Back in Vercel, the domain turns **Valid** within minutes. Full DNS propagation can take up to 48 hours, but it's usually under 30 minutes. Vercel issues the HTTPS certificate automatically.

## 5. Redeploy with the final `SITE_URL`

Pages are pre-built, so environment variable changes only take effect after a new deployment. If you set `SITE_URL` to the `.vercel.app` URL at first, change it to `https://yourdomain.com`, then go to **Deployments → ⋯ → Redeploy**.

The same applies whenever you change contact details later: edit the variable, then redeploy.

## 6. Email for job applications (SMTP)

Pick one:

- **Google Workspace / Gmail:** `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, `SMTP_USER=you@yourdomain.com`, and `SMTP_PASS` set to an **App Password** (Google Account → Security → 2-Step Verification → App passwords).
- **GoDaddy Microsoft 365 email:** `SMTP_HOST=smtp.office365.com`, `SMTP_PORT=587`. SMTP AUTH must be enabled for the mailbox.
- **Resend** (good free tier, made for apps): verify your domain in Resend by adding the DNS records it gives you in GoDaddy. Then use `SMTP_HOST=smtp.resend.com`, `SMTP_PORT=465`, `SMTP_USER=resend`, `SMTP_PASS=<API key>`, and `MAIL_FROM=PeachTech Careers <careers@yourdomain.com>`.

Test it by submitting an application at `https://yourdomain.com/careers#apply`. If nothing arrives, check **Vercel → Project → Logs** for lines starting with `[apply]`.

Resumes are limited to **4 MB** because Vercel rejects request bodies over 4.5 MB.

## 7. CI/CD: how it works

| Event | What happens |
| --- | --- |
| Push / open PR on any branch | GitHub Actions runs lint and build (`.github/workflows/ci.yml`). Vercel creates a **preview deployment** and comments its URL on the PR. |
| Merge / push to `main` | CI runs again and Vercel deploys to **production** (`yourdomain.com`). |
| Something breaks in production | **Vercel → Deployments** → pick the last good deployment → **Promote to Production** (instant rollback). |

**Recommended:** protect `main` so broken code can't reach production:

1. GitHub repo → **Settings → Branches → Add branch ruleset** (or *Add rule*) for `main`.
2. Enable **Require a pull request before merging**.
3. Enable **Require status checks to pass**, then add `build` (from CI) and `Vercel`.

**Day-to-day workflow:**
```bash
git checkout -b update-jobs
# edit src/lib/jobs.ts …
git commit -am "Update open roles"
git push -u origin update-jobs
# open a PR on GitHub → check the preview URL → merge → live
```

## 8. After going live: SEO checklist

1. **Google Search Console** (https://search.google.com/search-console): add a **Domain** property, then verify it by adding the TXT record it gives you in GoDaddy DNS. Submit `https://yourdomain.com/sitemap.xml`.
2. **Bing Webmaster Tools** (https://www.bing.com/webmasters): import from Search Console. Bing also powers ChatGPT search and Copilot.
3. Test a job page with Google's **Rich Results Test** (https://search.google.com/test/rich-results) to confirm it qualifies for Google for Jobs.
4. Check these load: `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/opengraph-image`.
5. Keep `datePosted` and `validThrough` in `src/lib/jobs.ts` up to date.
