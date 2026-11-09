import nodemailer from "nodemailer";
import { jobs } from "@/lib/jobs";
import { site } from "@/lib/site";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = {
  "application/pdf": ".pdf",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
} as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+()\-.\s]{7,40}$/;

// Simple in-memory rate limit: 5 submissions per IP per 10 minutes.
const hits = new Map<string, number[]>();
function rateLimited(ip: string | null) {
  if (!ip) return false; // can't tell visitors apart; don't lump them into one bucket
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const str = (fd: FormData, key: string, max: number) => {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
};

function bad(error: string, status = 400) {
  return Response.json({ error }, { status });
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip")?.trim() || null;
  if (rateLimited(ip)) return bad("Too many submissions. Please try again in a few minutes.", 429);

  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return bad("Invalid form submission.");
  }

  // Honeypot: silently accept bot submissions without sending anything.
  if (str(fd, "website", 200)) return Response.json({ ok: true });

  const fullName = str(fd, "fullName", 120);
  const email = str(fd, "email", 200);
  const phone = str(fd, "phone", 40);
  const profileUrl = str(fd, "profileUrl", 300);
  const message = str(fd, "message", 3000);
  const positionRaw = str(fd, "position", 200);
  const position = ["General application", ...jobs.map((j) => j.title)].includes(positionRaw)
    ? positionRaw
    : "General application";
  const consent = fd.get("consent");
  const resume = fd.get("resume");

  if (fullName.length < 2) return bad("Please enter your full name.");
  if (!EMAIL_RE.test(email)) return bad("Please enter a valid email address.");
  if (!PHONE_RE.test(phone)) return bad("Please enter a valid phone number.");
  if (profileUrl && !/^https?:\/\//i.test(profileUrl)) return bad("Profile URL must start with http:// or https://");
  if (!consent) return bad("Please accept the consent checkbox.");
  if (!(resume instanceof File) || resume.size === 0) return bad("Please attach your resume.");
  if (resume.size > MAX_BYTES) return bad("Your resume must be 5 MB or smaller.");

  const ext = resume.name.toLowerCase().match(/\.(pdf|docx?)$/)?.[0];
  const typeOk = resume.type in ALLOWED || resume.type === "" || resume.type === "application/octet-stream";
  if (!ext || !typeOk) return bad("Resume must be a PDF, DOC or DOCX file.");

  const host = process.env.SMTP_HOST;
  if (!host) {
    console.error("[apply] SMTP_HOST is not configured; cannot send application email.");
    return bad("Applications are temporarily unavailable. Please email us your resume instead.", 503);
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  });

  const to = process.env.APPLY_TO_EMAIL || site.contact.careersEmail;
  const from = process.env.MAIL_FROM || `"${site.name} Careers" <${process.env.SMTP_USER || site.contact.careersEmail}>`;
  const safeName = fullName.replace(/[^\p{L}\p{N} _.-]/gu, "").replace(/\s+/g, "_") || "applicant";
  const buffer = Buffer.from(await resume.arrayBuffer());

  const rows: [string, string][] = [
    ["Full name", fullName],
    ["Email", email],
    ["Phone", phone],
    ["Position", position],
    ["Profile URL", profileUrl || "—"],
    ["Message", message || "—"],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;color:#2a1812">
      <h2 style="color:#c63a17;margin:0 0 16px">New application: ${escapeHtml(position)}</h2>
      <table cellpadding="8" style="border-collapse:collapse;background:#fff8f1;border:1px solid #fbc7ad">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="font-weight:bold;vertical-align:top;border-bottom:1px solid #fbc7ad">${k}</td><td style="border-bottom:1px solid #fbc7ad;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="font-size:12px;color:#75594d">Resume attached. Submitted via ${escapeHtml(site.url)}/careers</p>
    </div>`;

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: { name: fullName, address: email },
      subject: `[Careers] ${position} — ${fullName}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html,
      attachments: [{ filename: `Resume_${safeName}${ext}`, content: buffer }],
    });

    if (process.env.APPLY_SEND_CONFIRMATION === "true") {
      await transporter
        .sendMail({
          from,
          to: { name: fullName, address: email },
          subject: `We received your application — ${site.legalName}`,
          text: `Hi ${fullName},\n\nThank you for applying for "${position}" at ${site.legalName}. Our recruiting team will review your application and get back to you by email if there's a match.\n\nBest regards,\n${site.name} Recruiting`,
        })
        .catch((e) => console.error("[apply] confirmation email failed:", e));
    }
  } catch (e) {
    console.error("[apply] sending failed:", e);
    return bad("We couldn't send your application right now. Please try again later.", 502);
  }

  return Response.json({ ok: true });
}
