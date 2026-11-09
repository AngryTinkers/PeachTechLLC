import Image from "next/image";
import type { Product } from "@/lib/products";
import { Icon } from "./icons";

const statusStyle: Record<Product["status"], string> = {
  Live: "bg-emerald-100 text-emerald-800",
  Beta: "bg-amber-100 text-amber-800",
  "Coming soon": "bg-cream-200 text-ink-muted",
};

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener"
      className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-peach-200/80 bg-cream-50/80 transition-all duration-500 hover:-translate-y-1.5 hover:border-peach-300 hover:shadow-[0_30px_60px_-30px_rgba(198,58,23,0.45)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={product.image}
          alt={`${product.name} — ${product.category}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[product.status]}`}>
          {product.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold tracking-[0.18em] text-peach-700 uppercase">{product.category}</p>
        <h3 className="mt-2 font-display text-2xl font-medium text-ink">{product.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{product.summary}</p>
        <ul className="mt-4 space-y-1.5 text-sm text-ink-soft">
          {product.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <Icon name="check" width={16} height={16} className="text-peach-600" /> {f}
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-peach-700">
          Visit {product.name}
          <Icon name="external" width={16} height={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  );
}
