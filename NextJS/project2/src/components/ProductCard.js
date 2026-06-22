"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const StarRating = ({ rate, count }) => {
  const fullStars = Math.floor(rate);
  const hasHalf = rate - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => {
          const isFull = i < fullStars;
          const isHalf = i === fullStars && hasHalf;

          return (
            <svg
              key={i}
              className={`h-3.5 w-3.5 fill-current ${
                isFull || isHalf
                  ? "text-amber-400"
                  : "text-muted-foreground/30"
              }`}
              viewBox="0 0 20 20"
            >
              {isHalf && (
                <defs>
                  <linearGradient id={`hg-${i}`}>
                    <stop offset="50%" stopColor="#fbbf24" />
                    <stop offset="50%" stopColor="#9ca3af" />
                  </linearGradient>
                </defs>
              )}

              <path
                fill={isHalf ? `url(#hg-${i})` : "currentColor"}
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
          );
        })}
      </div>

      <span className="text-xs text-muted-foreground">
        {rate} · {count} reviews
      </span>
    </div>
  );
};

const categoryStyles = {
  "men's clothing": {
    badge: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    dot: "bg-sky-500",
  },
  "women's clothing": {
    badge: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    dot: "bg-pink-500",
  },
  jewelery: {
    badge: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    dot: "bg-amber-500",
  },
  electronics: {
    badge: "bg-violet-500/10 text-violet-500 border-violet-500/20",
    dot: "bg-violet-500",
  },
};

export const ProductCard = ({ product }) => {
  const { title, price, description, category, image, rating } = product;

  const router = useRouter();

  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const style = categoryStyles[category] ?? {
    badge: "bg-muted text-muted-foreground border-border",
    dot: "bg-muted-foreground",
  };

  const handleAddToCart = () => {
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  return (
    <div className="group relative flex w-[320px] flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image Section */}
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-muted/40">
        <img
          src={image}
          alt={title}
          onClick={() => router.push(`/products/${product.id}`)}
          className="h-full cursor-pointer object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />

        {/* Wishlist */}
        <button
          onClick={() => setWished((prev) => !prev)}
          aria-label={
            wished ? "Remove from wishlist" : "Add to wishlist"
          }
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border shadow-sm transition-all duration-200
            ${
              wished
                ? "border-rose-500 bg-rose-500"
                : "border-border bg-background opacity-0 group-hover:opacity-100 hover:border-rose-300 hover:bg-rose-500/10"
            }`}
        >
          <svg
            className={`h-4 w-4 transition-colors ${
              wished
                ? "fill-current text-white"
                : "text-muted-foreground"
            }`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill={wished ? "currentColor" : "none"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Rating Pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full border bg-background/90 px-2 py-0.5 shadow-sm backdrop-blur-sm">
          <svg
            className="h-3 w-3 fill-current text-amber-400"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>

          <span className="text-[11px] font-semibold text-foreground">
            {rating.rate}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Category */}
        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${style.badge}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
          />
          {category}
        </span>

        {/* Title */}
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
          {title}
        </h3>

        {/* Description */}
        <p className="line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* Rating */}
        <StarRating
          rate={rating.rate}
          count={rating.count}
        />

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Price
            </span>

            <span className="text-lg font-bold text-foreground">
              ${price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-primary-foreground transition-all duration-200
              ${
                added
                  ? "scale-95 bg-emerald-500"
                  : "bg-primary hover:opacity-90 active:scale-95"
              }`}
          >
            {added ? (
              <>
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Added!
              </>
            ) : (
              <>
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};