import Image from "next/image";
import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="pt-44 pb-24">
      <Container className="flex flex-col items-center text-center">
        <Image src="/brand/logo.png" alt="" width={96} height={96} className="animate-float" />
        <h1 className="mt-8 font-display text-5xl font-medium text-ink">Page not found</h1>
        <p className="mt-4 max-w-md text-lg text-ink-muted">This page seems to have rolled away. Let&apos;s get you back on track.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Go home</ButtonLink>
          <ButtonLink href="/careers" variant="secondary">
            View open roles
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
