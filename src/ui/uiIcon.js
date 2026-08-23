"use client";

export default function Icon({
  icon,
  variant = "default",
  size = "md",
  className = "",
}) {
  const variants = {
    default: "text-zinc-400 hover:text-zinc-200",
    ghost: "hover:bg-zinc-800 hover:text-zinc-200",
    base: "bg-zinc-900 text-zinc-400 hover:bg-zinc-800",
    baseActive: "bg-zinc-800 text-zinc-400",
    primary: "bg-yellow-200 text-zinc-900 hover:bg-yellow-200",
    primaryActive: "bg-yellow-200 text-zinc-900",
  };

  const sizes = {
    sm: "w-6.5 h-6.5 px-0",
    md: "w-7 h-7 px-0",
    lg: "w-8.75 h-8.75 px-0",
  };

  const finalStyles = [
    "flex items-center justify-center rounded capitalize",
    className,
    variants[variant],
    sizes[size],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <span className={finalStyles}>
        {icon && <i className={`bi bi-${icon}`} aria-hidden="true" />}
      </span>
    </>
  );
}
