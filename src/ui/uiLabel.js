"use client";

export default function Label({
  variant = "default",
  size = "md",
  title,
  className = "",
}) {
  const variants = {
    default: "text-zinc-400",
    base: "bg-zinc-900 text-zinc-400",
    baseActive: "bg-zinc-800 text-zinc-400",
    primary: "bg-yellow-200 text-zinc-900",
    primaryActive: "bg-yellow-200 text-zinc-900",
  };

  const sizes = {
    sm: "text-xs gap-2",
    md: "text-xs gap-2 font-semibold",
    lg: "text-sm gap-2 font-semibold",
  };

  const finalStyles = [
    "flex capitalize",
    className,
    variants[variant],
    sizes[size],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <span className={finalStyles}>{title}</span>
    </>
  );
}
