import Link from "next/link";

export default function Button({
  children,
  href,
  variant = "default",
  size = "md",
  rounded,
  icon,
  iconEnd,
  className = "",
  ...props
}) {
  const hasText = !!children;

  const variants = {
    default: "text-zinc-400 hover:text-zinc-300",
    ghost: "hover:bg-zinc-800 hover:text-zinc-300",
    base: "bg-zinc-900 text-zinc-400 hover:bg-zinc-800",
    baseActive: "bg-zinc-800 text-zinc-400",
    primary: "bg-yellow-200 text-zinc-900 hover:bg-yellow-300",
    primaryActive: "bg-yellow-300 text-zinc-900",
  };

  const buttonSizes = {
    sm: "h-6.5 text-xs gap-2",
    md: "h-8 text-xs gap-2 font-semibold",
    lg: "h-10 text-sm gap-2 font-semibold",
  };

  const iconSizes = {
    sm: "w-6.5 h-6.5 px-0",
    md: "w-8 h-8 px-0",
    lg: "w-10 h-10 px-0",
  };

  const result = hasText
    ? `px-3 md:w-fit ${buttonSizes[size]}`
    : iconSizes[size];

  // Menggabungkan class menggunakan Array agar lebih bersih dari spasi ekstra
  const baseStyles = [
    `${
      rounded ? "rounded-full" : "rounded-md"
    } flex items-center justify-center capitalize cursor-pointer transition-colors duration-200 active:scale-98`,
    variants[variant],
    result,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && <i className={`bi bi-${icon}`} aria-hidden="true"></i>}
      {hasText && children}
      {iconEnd && <i className={`bi bi-${iconEnd}`} aria-hidden="true"></i>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseStyles} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseStyles} {...props}>
      {content}
    </button>
  );
}
