"use client";

import Link from "next/link";

export default function Card({
  href,
  src,
  title,
  variant = "potrait",
  type,
  view,
  className = "",
  ...props
}) {
  const variants = {
    potrait: "aspect-2/2.5",
    landscape: "aspect-5/3",
  };

  const baseStyles = [
    `w-full! h-min! active:scale-98 flex flex-col gap-2`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <Link href={href} aria-label={title} className={baseStyles} {...props}>
        <img
          src={src}
          alt={title}
          width={512}
          height={512}
          loading="lazy"
          decoding="async"
          className={`${variants[variant]} bg-zinc-800 object-cover rounded`}
        />

        <span className="text-zinc-400 text-xs font-light capitalize">
          {type} {view}
        </span>

        <h2 className="line-clamp-2 text-xs text-zinc-200 font-semibold capitalize">
          {title}
        </h2>
      </Link>
    </>
  );
}
