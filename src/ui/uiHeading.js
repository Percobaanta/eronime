"use client";

export default function Heading({
  heading = "h1",
  icon,
  title,
  className = "",
}) {
  const finalStyles = ["text-zinc-200 font-bold capitalize", className]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {heading === "h1" ? (
        <h1 className={finalStyles}>
          {icon && <i className={`bi bi-${icon} mr-2`} aria-hidden="true" />}
          {title}
        </h1>
      ) : heading === "h2" ? (
        <h2 className={finalStyles}>
          {icon && <i className={`bi bi-${icon} mr-2`} aria-hidden="true" />}
          {title}
        </h2>
      ) : (
        <h3 className={finalStyles}>
          {icon && <i className={`bi bi-${icon} mr-2`} aria-hidden="true" />}
          {title}
        </h3>
      )}
    </>
  );
}
